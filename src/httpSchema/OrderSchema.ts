export type OrderSchema = {
  uid: string;
  data: {
    id: string;
    quantity: number;
    prdInfo: string;
    additionalRequests?: string;
  }[];
  createdAt?: string;
};
