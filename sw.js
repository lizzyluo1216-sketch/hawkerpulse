
const CACHE_VERSION = 'v1.0.1'; // 每次更新 App 时递增此版本号
const CACHE_NAME = `hawkerpulse-${CACHE_VERSION}`;

const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/index.tsx',
  '/App.tsx',
  '/types.ts',
  '/constants.tsx'
];

// 第三方 CDN 资源
const EXTERNAL_ASSETS = [
  'https://cdn.tailwindcss.com',
  'https://esm.sh/react@^19.2.4',
  'https://esm.sh/react-dom@^19.2.4',
  'https://cdn-icons-png.flaticon.com/512/3443/3443338.png'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('正在预缓存静态资源...');
      return cache.addAll([...STATIC_ASSETS, ...EXTERNAL_ASSETS]);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('清理过期缓存:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
  return self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // 仅处理 GET 请求
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      // 命中缓存则返回
      if (response) return response;

      // 否则发起网络请求
      return fetch(event.request).then((networkResponse) => {
        // 只有成功的请求才入库
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // 如果是 HTML 请求失败且无缓存，可以重定向到首页
        if (event.request.headers.get('accept').includes('text/html')) {
          return caches.match('/');
        }
      });
    })
  );
});
