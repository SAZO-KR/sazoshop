export type CouponSchema = {
  id?: string;
  name?: string;
  description?: string;
  discount?: number;
  type?: 'PERCENT' | 'PRICE';
  createdAt: number;
  expiredAt: number;
};
