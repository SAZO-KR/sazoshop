import {AddressSchema} from './AddressSchema';
import {CouponSchema} from './CouponSchema';
import {PointSchema} from './PointSchema';

export type UserSchema = {
  [key: string]: string | number | boolean | undefined | object | object[];
  uid: string;
  firstName?: string;
  lastName?: string;
  firstNameKana?: string;
  lastNameKana?: string;
  birthYear?: number;
  phoneNumber?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  // 주소
  addresses?: AddressSchema[];
  // 쿠폰
  coupons?: CouponSchema[];
  // 포인트
  points?: PointSchema[];
  // 기본 결제 수단
  defaultPayment?: {
    method: 'Card' | 'Applepay' | 'Konbini' | 'Paypay' | 'Googlepay';
    cardInfo?: {
      cardId: string;
      cardNumber?: string;
      cardExpiry?: string;
      cardBrand?: string;
      cardHolderName?: string;
    };
  };
  // 설정
  settings?: {
    // 수신 동의
    isAgreedToReceiveEmail?: boolean;
    isAgreedToReceiveSMS?: boolean;
  };
};
