/* eslint-disable @typescript-eslint/no-explicit-any */
export default class PrdAttr {
  id: string;

  name?: string;

  translatedName?: string;

  dependency?: string[];

  price?: number;

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

  static fromJSON(data: any): PrdAttr {
    return Object.assign(new PrdAttr(data), data);
  }

  hash(): string {
    const SHA256 = require('crypto-js/sha256');
    return SHA256(this.toJSON()).toString();
  }
}
