/* eslint-disable @typescript-eslint/no-explicit-any */
import PrdAttr from './PrdAttr';

export default class PrdOption {
  title: string;

  translatedTitle?: string;

  required?: boolean = true; // 필수 옵션 여부 선택형인지 필수인지 default : true

  type?: 'TEXT' | 'SELECT' = 'SELECT'; // 옵션 타입 입력형인지 선택형인지 default : SELECT

  textValue?: string; // 입력형 옵션의 입력값. type이 TEXT일 때만 사용

  translatedTextValue?: string; // 입력형 옵션의 번역된 입력값. type이 TEXT일 때만 사용

  attributes?: PrdAttr[];

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

  static fromJSON(data: any): PrdOption {
    const prdOption = Object.assign(new PrdOption(), data);
    prdOption.attributes = data.attributes.map(PrdAttr.fromJSON);
    // null safety ok
    prdOption.prevOption = data.prevOption
      ? PrdOption.fromJSON(data.prevOption)
      : undefined;
    // null safety oks
    prdOption.nextOption = data.nextOption
      ? PrdOption.fromJSON(data.nextOption)
      : undefined;
    return prdOption;
  }
}
