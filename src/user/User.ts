export type UserData = {
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

export default class User {
  uid: string;
  displayName?: string;
  email?: string;

  constructor(uid: string) {
    this.uid = uid;
  }
}
