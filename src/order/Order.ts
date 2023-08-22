import PrdInfo from '../prdInfo/PrdInfo';
import User from '../user/User';
import DeliveryState from './DeliveryState';

export enum OrderState {
  ordered = 'ORDERED', // 주문 검토중
  reviewed = 'REVIEWED', // 검토완료,  결제대기중
  payment = 'PAYMENT', // 결제 완료, 배송대기중
  shipping = 'SHIPPING', // 배송 중
  delivered = 'DELIVERED', // 배송 완료
}
/**
 * All data of an order.
 */
export default class Order {
  orderId: string;
  prds: PrdInfo[];
  orderState: OrderState;
  deliveryState?: DeliveryState[];
  lastUpdatedDate?: Date;
  orderDate?: Date;
  user?: User;

  /**
   * @description Add a product to the order. This method only runs on ordered or reviewing state.
   * If the method called, the order state will be changed to reviewed.
   * @param prd
   */
  addPrd(prd: PrdInfo) {
    this.prds.push(prd);
    this.update();
  }

  /**
   * @description Delete a product from the order. This method only runs on ordered or reviewing state.
   * If the method called, the order state will be changed to reviewed.
   * @param prd
   */
  deletePrd(prd: PrdInfo) {
    const index = this.prds.indexOf(prd);
    if (index > -1) {
      this.prds.splice(index, 1);
    }
    this.update();
  }

  /**
   * Update information if the order is changed.
   */
  private update() {
    this.lastUpdatedDate = new Date();
  }

  constructor(orderId: string) {
    this.orderId = orderId;
    this.prds = [];
    this.orderState = OrderState.ordered;
  }
}
