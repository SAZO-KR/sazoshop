export type CartSchema = {
  uid: string;
  data: {
    id: string;
    quantity: number;
    prdInfo: string;
    additionalRequests?: string;
  }[];
};
