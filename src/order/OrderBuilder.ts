import Order from './Order';
import DeliveryState from './DeliveryState';
import PrdInfo from '../prdInfo/PrdInfo';
import User from '../user/User';

export default class OrderBuilder {
  order: Order;

  // Generaters
  prds(prds: PrdInfo[]) {
    this.order.prds = prds;
    return this;
  }

  deliveryState(deliveryState: DeliveryState[]) {
    this.order.deliveryState = deliveryState;
    return this;
  }

  user(user: User) {
    this.order.user = user;
    return this;
  }

  // Modifiers
  addPrd(prd: PrdInfo) {
    if (!this.order.prds) {
      this.order.prds = [prd];
      this.update();
      return this;
    }
    this.order.prds.push(prd);
    this.update();
    return this;
  }

  /**
   * Update information if the order is changed.
   */
  private update() {
    this.order.lastUpdatedDate = new Date();
  }

  build() {
    return this.order;
  }

  constructor(orderId: string) {
    const nowDate = new Date();
    this.order = new Order(orderId);
    this.order.lastUpdatedDate = nowDate;
    this.order.orderDate = nowDate;
  }
}
