export type OrderSchema = {
  uid: string;
  orderId?: string;
  data: {
    id: string;
    quantity: number;
    prdInfo: string;
    additionalRequests?: string;
  }[];
  createdAt?: number; // Timestamp.now().toMillis()
  updatedAt?: number; // Timestamp.now().toMillis()
  state?: 'PENDING' | 'APPROVE' | 'REJECT' | 'SHIPPING' | 'SHIPPED';
};
