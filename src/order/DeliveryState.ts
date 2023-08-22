export default class DeliveryState {
  message: string;
  datetime?: Date;

  setDatetime(datetime: Date) {
    this.datetime = datetime;
  }

  constructor(message: string) {
    this.message = message;
    this.datetime = new Date();
  }
}
