export interface MemoryPhoto {
  id: string;
  url: string;
  caption: string;
  date?: string;
  isDefault?: boolean;
}

export interface LoveCoupon {
  id: string;
  title: string;
  description: string;
  icon: string;
  redeemed: boolean;
  redeemedAt?: string;
}

export interface ReasonItem {
  id: string;
  text: string;
  favorited?: boolean;
}
