export type DeliverySchema = {
  company: string; // 택배사
  invoiceNumber: string; // 송장번호
  datetime?: number;
  state?: string; // 배송 상태 (준비 중, 배송 중, 배송 완료, 배송 지연 등)
};
