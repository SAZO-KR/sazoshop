export default class User {
  uid: string;
  displayName?: string;
  email?: string;

  constructor(uid: string) {
    this.uid = uid;
  }
}
