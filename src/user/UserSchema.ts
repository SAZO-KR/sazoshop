import {AddressSchema} from './AddressSchema';
import {CouponSchema} from './CouponSchema';
import {PointSchema} from './PointSchema';

export type UserSchema = {
  [key: string]: string | number | boolean | undefined | object[];
  uid: string;
  firstName?: string;
  lastName?: string;
  firstNameKana?: string;
  lastNameKana?: string;
  birthYear?: number;
  phoneNumber?: string;
  email?: string;
  emailVerified?: boolean;
  hasAgreedToPolicy?: boolean;
  displayName?: string;
  photoURL?: string;
  // 주소
  addresses?: AddressSchema[];
  // 쿠폰
  coupons?: CouponSchema[];
  // 포인트
  points?: PointSchema[];
};
