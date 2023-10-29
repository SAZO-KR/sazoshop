import {CouponSchema} from './CouponSchema';
import {PointSchema} from './PointSchema';

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
    name: string; // 주소 별칭
    recipientName: string; // 수령인 이름
    recipientNameKana: string; // 수령인 이름
    recipientPhoneNumber: string; // 수령인 전화번호
    isDefault?: boolean;
    postalCode?: string;
    address?: string;
    addressDetail?: string;
  }[];
  // 쿠폰
  coupons?: CouponSchema[];
  // 포인트
  points?: PointSchema[];
};
