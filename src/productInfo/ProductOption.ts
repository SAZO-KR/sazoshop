/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductAttribute from './ProductAttribute';

export default class ProductOption {
  title: string;

  translatedTitle?: string;

  required?: boolean = true; // 필수 옵션 여부 선택형인지 필수인지 default : true

  attributes?: ProductAttribute[];

  selectedAttributeId?: string;

  constructor(title = '') {
    this.title = title;
  }

  // === JSON ===
  toJSON(): any {
    return {
      ...this,
      attributes: this.attributes?.map(attr => attr.toJSON()),
    };
  }

  static fromJSON(data: any): ProductOption {
    const prdOption = Object.assign(new ProductOption(), data);
    prdOption.attributes = data.attributes.map(ProductAttribute.fromJSON);
    // null safety ok
    prdOption.prevOption = data.prevOption
      ? ProductOption.fromJSON(data.prevOption)
      : undefined;
    // null safety oks
    prdOption.nextOption = data.nextOption
      ? ProductOption.fromJSON(data.nextOption)
      : undefined;
    return prdOption;
  }
}
