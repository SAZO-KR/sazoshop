export type UserSchema = {
  [key: string]: string | boolean | undefined;
  uid?: string;
  firstName?: string;
  lastName?: string;
  firstNameKana?: string;
  lastNameKana?: string;
  birth?: string;
  phoneNumber?: string;
  email?: string;
  emailVerified?: boolean;
  displayName?: string;
  photoURL?: string;
  postCode?: string;
  address?: string;
  addressDetail?: string;
};
