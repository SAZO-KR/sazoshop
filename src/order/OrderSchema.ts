import {UserData} from '../user/User';

export type OrderSchema = {
  uid?: string; // User.uid
  orderId?: string; // 주문번호
  productInfo: string;
  required: {
    selectedOption: string;
    translatedSelectedOption: string;
    quantity: number;
    price: number;
  }[];
  extra: {
    selectedOption: string;
    translatedSelectedOption: string;
    quantity: number;
    price: number;
  }[];
  additionalRequests?: string; // 추가 요청사항
  createdAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  updatedAt?: number; // Timestamp.now().toMillis() 서버측에서 생성
  state?: 'PENDING' | 'APPROVE' | 'REJECT' | 'SHIPPING' | 'SHIPPED'; // 서버측에서 관리
  // 배송 정보 클라이언트측에서 입력
  deliveryInfo?: UserData;
  deliveryOption?: string; // 배송 옵션
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
  userInfo?: UserData;
};
