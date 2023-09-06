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

  selectedAttributeId?: string;

  prevOption?: PrdOption;

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
   * @description 선택가능한 옵션들을 반환. 선택가능한 옵션은 의존성에 포함되지 않은 옵션
   * @returns  선택가능한 옵션
   */
  selectableAttributes(): PrdAttr[] | undefined {
    if (this.attributes === undefined) return undefined;
    return this.attributes.filter(attr => this.isSelectableAttribute(attr));
  }

  /**
   * @description 선택가능한 옵션인지 확인하고 선택. 선택된 옵션의 id가 this.selectedAttributeId에 저장
   * @param id 선택할 attribute의 id
   * @throws 선택할 수 없는 옵션을 선택하려고 할 때
   * @returns 선택된 attribute | undefined
   */
  selectAttribute(id: string): PrdAttr | undefined {
    if (this.attributes === undefined) throw new OptionNoAttrError();
    const attr = this.attributes.find(value => value.id === id);
    if (attr && this.isSelectableAttribute(attr))
      this.selectedAttributeId = attr.id;
    return attr;
  }

  /**
   * @description 선택된 옵션을 해제. this.selectedAttributeId를 undefined로 설정
   */
  unselectAttribute() {
    this.selectedAttributeId = undefined;
  }

  /**
   * @description 의존성을 재귀적으로 확인
   * 선행 옵션의 선택된 attribute가 의존성에 포함되어있는지를 확인
   * @param attr 선택가능한 옵션인지 확인할 attribute
   * @returns
   */
  isSelectableAttribute(attr: PrdAttr): boolean {
    if (this.prevOption === undefined || attr.dependency === undefined)
      return true;

    let prev: PrdOption | undefined = this.prevOption; // 선행 옵션
    let i = attr.dependency.length - 1; // 의존성 배열의 마지막 인덱스
    while (prev !== undefined && i >= 0) {
      if (attr.dependency[i] !== prev.selectedAttributeId) return false;
      prev = prev.prevOption;
      i--;
    }
    return true;
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
      prevOption: this.prevOption ? this.prevOption.toJSON() : undefined,
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
