/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductAttribute from './ProductAttribute';

export default class ProductOption {
  title: string;

  translatedTitle?: string;

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
    return prdOption;
  }
}
