/* eslint-disable @typescript-eslint/no-explicit-any */
import PrdInfo from './PrdInfo';
import PrdOptionBuilder from './PrdOptionBuilder';

export default class PrdInfoBuilder {
  prd: PrdInfo;

  constructor() {
    this.prd = new PrdInfo();
  }

  title(title: string) {
    this.prd.title = title;
    return this;
  }

  sitename(sitename: string) {
    this.prd.sitename = sitename;
    return this;
  }

  url(url: string) {
    this.prd.url = url;
    return this;
  }

  originPrice(originPrice: number) {
    this.prd.originPrice = originPrice;
    return this;
  }

  salePrice(salePrice: number) {
    this.prd.salePrice = salePrice;
    return this;
  }

  thumbnailURL(thumbnailURL: string[]) {
    this.prd.thumbnailURL = thumbnailURL;
    return this;
  }

  isRocketDelivery(isRocketDelivery: boolean) {
    this.prd.isRocketDelivery = isRocketDelivery;
    return this;
  }

  deliveryFee(deliveryFee: number) {
    this.prd.deliveryFee = deliveryFee;
    return this;
  }

  gifts(gifts: string) {
    this.prd.gifts = gifts;
    return this;
  }

  private option(OptionBuilder: PrdOptionBuilder) {
    const option = OptionBuilder.build();
    // 옵션이 없을 때
    if (this.options.length === 0) {
      this.prd.options.push(option);
      return this;
    }
    // 옵션이 있을 때
    this.prd.options.push(option);
    return this;
  }

  options(OptionBuilders: PrdOptionBuilder[]) {
    OptionBuilders.forEach(builder => {
      this.option(builder);
    });
    return this;
  }

  optionPriceMap(optionPriceMap: Map<string, number>) {
    this.prd.optionPriceMap = optionPriceMap;
    return this;
  }

  toJSON() {
    return this.prd.toJSON();
  }

  static fromJSON(data: any): PrdInfoBuilder {
    const builder = new PrdInfoBuilder();
    builder.prd = PrdInfo.fromJSON(data);
    return builder;
  }

  build() {
    this.prd.id = this.prd.hash();
    return this.prd;
  }
}
