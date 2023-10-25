import {CartSchema} from '../cart/CartSchema';
import {DeliverySchema} from '../delivery/DeliverySchema';
import {UserSchema} from '../user/UserSchema';

export type OrderSchema = {
  [key: string]:
    | string
    | number
    | undefined
    | object
    | CartSchema[]
    | DeliverySchema[]
    | UserSchema;
  uid?: string; // User.uid
  orderId?: string; // 주문번호
  data?: CartSchema[];
  totalPrice?: number; // 총 가격
  additionalRequests?: string; // 추가 요청사항
  createdAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  updatedAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  state?: 'PENDING' | 'APPROVE' | 'REJECT' | 'SHIPPING' | 'SHIPPED'; // 승인대기/승인/거절/배송중/배송완료
  // 배송 정보 클라이언트측에서 입력 (택배사에 전달할 내용)
  deliveryInfo?: {
    recipientName: string; // 수령인 이름
    recipientNameKana: string; // 수령인 이름
    recipientPhoneNumber: string; // 수령인 전화번호
    postCode: string;
    address: string;
    addressDetail: string;
    shippingDate?: number; // 발송일
    shippedDate?: number; // 배송 완료일
    shippingMemo?: string; // 배송 메모
    shippingType?: string; // 배송편 (배, 비행기 등)
  };
  deliveryHistory?: DeliverySchema[]; // 배송 이력 (택배사로부터 받는 정보)
  // 결제 정보 클라이언트측에서 부분적으로 입력
  paymentInfo?: {
    state?: 'PENDING' | 'AUTHORIZED' | 'REJECTED' | 'CAPTURED' | 'FAILED'; // 승인대기/승인/거절/결제완료/결제실패
    method?: 'CARD' | 'Applepay' | 'Konbini' | 'Paypay';
    cardInfo?: {
      cardNumber?: string;
      cardExpiry?: string;
      cardCVC?: string;
    };
  };
  // 주문자 정보
  userInfo?: UserSchema;
};
