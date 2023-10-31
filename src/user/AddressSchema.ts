export type AddressSchema = {
  name?: string; // 주소 별칭
  recipientFirstName: string;
  recipientLastName: string;
  recipientFirstNameKana: string;
  recipientLastNameKana: string;
  recipientPhoneNumber: string; // 수령인 전화번호
  isDefault?: boolean;
  postalCode?: string;
  address?: string;
  addressDetail?: string;
};
