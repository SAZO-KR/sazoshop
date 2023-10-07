/* eslint-disable @typescript-eslint/no-explicit-any */
export default class ProductAttribute {
  id: string;

  name?: string;

  translatedName?: string;

  dependency?: string[];

  price?: number;

  convertedPrice?: number;

  imageURL?: string;

  constructor(id: string) {
    this.id = id;
  }

  setTranslatedName(value: string) {
    this.translatedName = value;
  }

  toJSON(): any {
    return this;
  }

  static fromJSON(data: any): ProductAttribute {
    return Object.assign(new ProductAttribute(data), data);
  }

  hash(): string {
    const SHA256 = require('crypto-js/sha256');
    return SHA256(this.toJSON()).toString();
  }
}
