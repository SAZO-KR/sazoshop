export type CartSchema = {
  id?: string;
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
  additionalRequests?: string;
};
