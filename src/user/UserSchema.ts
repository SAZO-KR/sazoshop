export type UserSchema = {
  [key: string]: string | number | boolean | undefined | object[];
  uid?: string;
  firstName?: string;
  lastName?: string;
  firstNameKana?: string;
  lastNameKana?: string;
  birth?: string;
  phoneNumber?: string;
  email?: string;
  emailVerified?: boolean;
  hasAgreedToPolicy?: boolean;
  displayName?: string;
  photoURL?: string;
  // 주소
  addresses?: {
    isDefault?: boolean;
    postalCode?: string;
    address?: string;
    addressDetail?: string;
  }[];
  // 쿠폰
  coupons?: {
    id?: string;
    name?: string;
    description?: string;
    discount?: number;
    type?: 'PERCENT' | 'PRICE';
    createdAt: number;
    expiredAt: number;
  }[];
  // 포인트
  points?: {
    amount: number;
    description?: string;
    createdAt?: number;
    expiredAt: number;
  }[];
};
