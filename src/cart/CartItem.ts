export type CartItem = {
  id: string;
  productInfo: string;
  required: {
    selectedOption: string;
    translatedSelectedOption: string;
    quantity: number;
  }[];
  extra: {
    selectedOption: string;
    translatedSelectedOption: string;
    quantity: number;
  }[];
  additionalRequests?: string;
};
