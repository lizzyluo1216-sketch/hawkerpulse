
import { Stall, RedeemItem, Medal } from './types';

export const COLORS = {
  primaryRed: '#E11D48',
  primaryBlue: '#1D4ED8',
  lightBeige: '#F5F5DC',
  extreme: '#EF4444',
  crowded: '#F59E0B',
  smooth: '#10B981'
};

export const STALLS: Stall[] = [
  {
    id: '1',
    name: '杂菜饭',
    queueCount: 20,
    estimatedWait: 21,
    label: '队长但快',
    subLabel: '高效流水线',
    type: 'fast',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?q=80&w=800',
    stockCount: 450
  },
  {
    id: '2',
    name: '麻辣香锅',
    queueCount: 11,
    estimatedWait: 30,
    label: '风险提示',
    subLabel: '选菜称重+单锅现煮',
    type: 'slow',
    image: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?q=80&w=800',
    stockCount: 15 // 保持低库存以触发预警
  },
  {
    id: '3',
    name: '砂锅米线',
    queueCount: 12,
    estimatedWait: 22,
    label: '等待稳定',
    subLabel: '单锅单煮，出餐节奏固定',
    type: 'standard',
    image: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?q=80&w=800',
    stockCount: 120
  },
  {
    id: '4',
    name: '汉堡薯条',
    queueCount: 10,
    estimatedWait: 7,
    label: '速度最快',
    subLabel: '标准化取餐，无需等待',
    type: 'fast',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=800',
    stockCount: 500
  },
  {
    id: '5',
    name: '凉拌菜',
    queueCount: 18,
    estimatedWait: 14,
    label: '流程极简',
    subLabel: '现点现拌，吞吐量大',
    type: 'fast',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=800',
    stockCount: 250
  },
  {
    id: '6',
    name: '卤菜饭',
    queueCount: 15,
    estimatedWait: 16,
    label: '稳健之选',
    subLabel: '成品出餐，速度恒定',
    type: 'standard',
    image: 'https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?q=80&w=800',
    stockCount: 35 // 保持低库存以触发预警
  }
];

export const REDEEM_ITEMS: RedeemItem[] = [
  { id: 'r1', name: '餐巾纸 (1包)', cost: 500, icon: '🧻' },
  { id: 'r2', name: '自选罐装饮料', cost: 1500, icon: '🥤' },
  { id: 'r3', name: '全场$2满减券', cost: 3000, icon: '🎟️' },
  { id: 'r4', name: '全场$5满减券', cost: 6000, icon: '🎫' },
];

export const MEDALS: Medal[] = [
  { id: 'm1', name: '早起鸟', description: '在早上9点前完成取餐', unlocked: true, icon: '🌅' },
  { id: 'm2', name: '闪电侠', description: '选择等待时间小于10分钟的档口', unlocked: true, icon: '⚡' },
  { id: 'm3', name: '时间领航员', description: '累计节省时间超过60分钟', unlocked: false, icon: '🛰️' },
  { id: 'm4', name: '光盘卫士', description: '连续3天反馈无浪费取餐', unlocked: false, icon: '🍽️' },
];
