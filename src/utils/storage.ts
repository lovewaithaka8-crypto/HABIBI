import { MemoryPhoto, LoveCoupon } from '../types';

const STORAGE_KEYS = {
  DATE: 'loveStartDate',
  THEME: 'habibti_theme',
  CUSTOM_REASONS: 'habibti_custom_reasons',
  COUPONS: 'habibti_coupons',
  UPLOADED_PHOTOS: 'habibti_photos',
  ROSE_COUNT: 'habibti_rose_count',
};

export const defaultCoupons: LoveCoupon[] = [
  {
    id: 'c1',
    title: 'Late Night Ice Cream & Drive',
    description: 'Good for one spontaneous late night car ride with our favorite music and ice cream.',
    icon: '🍦',
    redeemed: false,
  },
  {
    id: 'c2',
    title: 'Unconditional Warm Hug',
    description: 'Whenever you have a long day or need comfort, redeem this for a long, quiet bear hug.',
    icon: '🫂',
    redeemed: false,
  },
  {
    id: 'c3',
    title: 'Your Choice Movie Night',
    description: 'You pick the movie, the snacks, and I will not complain even if it is a 3-hour drama.',
    icon: '🎬',
    redeemed: false,
  },
  {
    id: 'c4',
    title: 'Home Cooked Special Dinner',
    description: 'I will prepare your favorite meal, set the table with candles, and do all the dishes.',
    icon: '🕯️',
    redeemed: false,
  },
  {
    id: 'c5',
    title: 'Foot & Back Massage',
    description: '30 uninterrupted minutes of relaxing massage with soothing oils after a tiring week.',
    icon: '✨',
    redeemed: false,
  },
  {
    id: 'c6',
    title: 'Win Any Argument Free Pass',
    description: 'Play this card and I immediately concede defeat, agree with you, and apologize with a kiss.',
    icon: '👑',
    redeemed: false,
  },
];

export const getSavedDate = (): string => {
  return localStorage.getItem(STORAGE_KEYS.DATE) || '2024-01-01';
};

export const setSavedDate = (date: string): void => {
  localStorage.setItem(STORAGE_KEYS.DATE, date);
};

export const getSavedTheme = (): 'dark' | 'light' => {
  const theme = localStorage.getItem(STORAGE_KEYS.THEME);
  return theme === 'light' ? 'light' : 'dark';
};

export const setSavedTheme = (theme: 'dark' | 'light'): void => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

export const getSavedCoupons = (): LoveCoupon[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.COUPONS);
    if (!raw) return defaultCoupons;
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length ? parsed : defaultCoupons;
  } catch {
    return defaultCoupons;
  }
};

export const saveCoupons = (coupons: LoveCoupon[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.COUPONS, JSON.stringify(coupons));
  } catch {
    // ignore
  }
};

export const getRoseCount = (): number => {
  const val = localStorage.getItem(STORAGE_KEYS.ROSE_COUNT);
  return val ? parseInt(val, 10) : 100;
};

export const saveRoseCount = (count: number): void => {
  localStorage.setItem(STORAGE_KEYS.ROSE_COUNT, count.toString());
};

export const getStoredPhotos = (): MemoryPhoto[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.UPLOADED_PHOTOS);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveStoredPhotos = (photos: MemoryPhoto[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.UPLOADED_PHOTOS, JSON.stringify(photos));
  } catch {
    // Quota safety
  }
};
