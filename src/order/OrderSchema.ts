import {CartSchema} from '../cart/CartSchema';
import {DeliverySchema} from '../delivery/DeliverySchema';
import {UserSchema} from '../user/UserSchema';

export type OrderSchema = {
  uid?: string; // User.uid
  orderId?: string; // 주문번호
  data: CartSchema[];
  additionalRequests?: string; // 추가 요청사항
  createdAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  updatedAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  state?: 'PENDING' | 'APPROVE' | 'REJECT' | 'SHIPPING' | 'SHIPPED';
  // 배송 정보 클라이언트측에서 입력
  deliveryInfo?: {
    recipientName: string; // 수령인 이름
    recipientPhoneNumber: string; // 수령인 전화번호
    postCode: string;
    address: string;
    addressDetail: string;
    shippingDate?: number; // 발송일
    shippedDate?: number; // 도착일 
    shippingMemo?: string; // 배송 메모

  };
  // 배송 이력
  deliveryHistory?: DeliverySchema[];
  // 결제 정보 클라이언트측에서 부분적으로 입력
  paymentInfo?: {
    method?: 'CARD';
    cardInfo?: {
      cardNumber?: string;
      cardExpiry?: string;
      cardCVC?: string;
    };
  };
  // 주문자 정보
  userInfo?: UserSchema;
};
