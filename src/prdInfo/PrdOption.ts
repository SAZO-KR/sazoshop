/* eslint-disable @typescript-eslint/no-explicit-any */
import {OptionNoAttrError, OptionTypeError} from './Error';
import PrdAttr from './PrdAttr';

export default class PrdOption {
  title: string;

  translatedTitle?: string;

  required?: boolean; // 필수 옵션 여부 선택형인지 필수인지

  type?: 'TEXT' | 'SELECT'; // 옵션 타입 입력형인지 선택형인지

  textValue?: string; // 입력형 옵션의 입력값. type이 TEXT일 때만 사용

  translatedTextValue?: string; // 입력형 옵션의 번역된 입력값. type이 TEXT일 때만 사용

  attributes?: PrdAttr[];

  hasDependency?: boolean; // 상위 옵션에 의존성이 있는지

  selectedAttributeId?: string;

  constructor(title = '') {
    this.title = title;
    this.attributes = [];
    this.type = 'SELECT';
  }

  /**
   * @description 텍스트 옵션의 입력값을 설정. type이 TEXT일 때만 사용가능
   * @param value 텍스트 옵션의 입력값
   */
  setTextValue(value: string) {
    if (this.type !== 'TEXT') throw new OptionTypeError('type is not TEXT.');
    this.textValue = value;
  }
  /**
   * @returns 선택된 attribute
   */
  selectedAttribute(): PrdAttr | undefined {
    if (this.selectedAttributeId === undefined) return undefined;
    if (this.attributes === undefined) throw new OptionNoAttrError();
    return this.attributes.find(attr => attr.id === this.selectedAttributeId);
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
