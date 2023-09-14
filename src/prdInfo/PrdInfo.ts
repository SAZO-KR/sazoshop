/* eslint-disable @typescript-eslint/no-explicit-any */
import PrdAttr from './PrdAttr';
import PrdOption from './PrdOption';

/**
 * 상품 정보 클래스
 * @description
 * 상품 정보를 담는 클래스. PrdInfoBuilder를 통해 생성한다.
 * @example
 * const prdInfo = new PrdInfoBuilder().setTitle('상품명').build();
 *
 */
export default class PrdInfo {
  id?: string;

  title?: string;

  url?: string;

  sitename?: string;

  translatedTitle?: string;

  originPrice?: number; // 할인 안된 가격

  salePrice?: number; // 할인된 가격

  thumbnailURL?: string[];

  isRocketDelivery?: boolean;

  deliveryFee?: number;

  gifts?: string; // 사은품

  /**
   * @description
   * 옵션들을 담는 배열
   * @example
   * prdInfo.options.forEach(option => {
   *  console.log(option.title);
   * });
   */
  options: PrdOption[] = [];

  /**
   * @description
   * 옵션 조합 별 가격을 담는 맵
   * @example
   * {
   *  "attrId1:attrId2:...:attrIdn": 10000,
   *  ...
   *  "attrId1:attrId2:...:attrIdn": 12000,
   * }
   *
   */
  optionPriceMap?: Map<string, number>; // Key: "속성1:속성2:...:속성n"옵션조합 별 가격

  // importFirestoreData() {}
  // exportFirestoreData() {}

  // * 옵션과 속성에 관련한 메소드들=============================
  /**
   *
   * @param optionIdx
   * @param attrId
   */
  selectAttribute(optionIdx: number, attrId: string) {
    if (optionIdx >= this.options.length)
      throw new Error('There is no option at this index.');
    if (this.isSelectableAttribute(optionIdx, attrId)) {
      this.options[optionIdx].selectedAttributeId = attrId;
      return;
    }
    console.error('This attribute is not selectable.');
  }
  /**
   * @description 해당 옵션의 선택된 속성을 반환
   * @param optionIdx 옵션 인덱스
   * @return 선택된 속성
   */
  selectedAttribute(optionIdx: number): PrdAttr | undefined {
    if (optionIdx >= this.options.length) return undefined;
    return this.options[optionIdx].attributes?.find(
      attr => attr.id === this.options[optionIdx].selectedAttributeId
    );
  }

  /**
   * @description 해당 옵션의 선택을 해제
   * @param optionIdx 옵션 인덱스
   */
  unselectAttribute(optionIdx: number) {
    if (optionIdx >= this.options.length) return;
    this.options[optionIdx].selectedAttributeId = undefined;
  }

  /**
   * @description 해당 옵션의 선택가능한 속성 배열을 반환
   * @param optionIdx 옵션 인덱스
   * @return 선택 가능한 속성 배열
   * @
   */
  selectableAttributes(optionIdx: number) {
    if (optionIdx >= this.options.length)
      throw new Error('There is no option at this index.');
    return this.options[optionIdx].attributes?.filter(attr =>
      this.isSelectableAttribute(optionIdx, attr.id)
    );
  }

  /**
   * @description 옵션의 속성이 선택 가능한지 확인. 의존성이 없으면 무조건 true. 의존성이 있으면 의존성이 있는 옵션들이 선택되어 있는지 확인
   * @param optionIdx
   * @param attrId
   * @example
   */
  isSelectableAttribute(optionIdx: number, attrId: string): boolean {
    const attr: PrdAttr | undefined = this.options[optionIdx].attributes?.find(
      attr => attr.id === attrId
    );
    if (attr === undefined) return false; // 속성이 없으면 false
    if (!attr.dependency) return true; // 의존성이 없으면 true
    if (optionIdx >= this.options.length) return false; // 옵션이 없으면 false
    // 의존성이 있으면 의존성이 있는 옵션들이 선택되어 있는지 확인

    for (let i = 0; i < optionIdx; i++) {
      // i번째 의존성 != i번째 옵션의 선택된 속성 이q면 false
      if (attr.dependency[i] !== this.selectedAttribute(i)?.id) {
        return false;
      }
    }
    return true;
  }

  setTextValue(optionIdx: number, value: string) {
    if (
      optionIdx >= this.options.length ||
      this.options[optionIdx].type !== 'TEXT'
    )
      return;
    this.options[optionIdx].textValue = value;
  }

  /**
   * @returns {number} 옵션까지 다 합친 가격
   */
  totalPrice(): number {
    // 가격 맵이 있으면 맵에서 찾아서 반환
    if (this.optionPriceMap && this.optionPriceMap.size > 0) {
      const key = '';
      this.options.forEach((opt, idx) => {
        key.concat(this.selectedAttribute(idx)?.id ?? '');
      });
      if (this.optionPriceMap.get(key) === undefined)
        throw new Error('There is no price for this option.');
      return this.optionPriceMap.get(key) ?? 0;
    }
    // 가격 맵이 없으면 옵션 가격을 다 더해서 반환
    let totalPrice = this.salePrice ?? 0;
    this.options.forEach((opt, idx) => {
      totalPrice += this.selectedAttribute(idx)?.price ?? 0;
    });
    return totalPrice;
  }

  /**
   * @description 번역 된 타이틀을 설정
   */
  setTranslatedTitle(value: string) {
    this.translatedTitle = value;
  }

  // * 번역 관련 메소드들=======================================
  // Map을 배열로 변환
  private static readonly mapToArray = (
    map: Map<string, string>
  ): Array<[string, string]> => Array.from(map.entries());

  // 배열을 Map으로 복원
  private static readonly arrayToMap = (
    arr: Array<[string, string]>
  ): Map<string, string> => new Map(arr);

  /**
   * @description 번역을 위해 PrdInfo와 하위 정보의 모든 한글 텍스트를 Hash값과 문자열로 이루어진 맵으로 변환
   */
  exportOriginalText(): Array<[string, string]> {
    const SHA256 = require('crypto-js/sha256');
    const map = new Map<string, string>();
    if (this.title !== undefined)
      map.set(SHA256(this.title).toString(), this.title);
    this.options.forEach(option => {
      if (option.title !== undefined)
        map.set(SHA256(option.title).toString(), option.title);
      option.attributes?.forEach(attr => {
        if (attr.name !== undefined)
          map.set(SHA256(attr.name).toString(), attr.name);
      });
      option.textValue
        ? map.set(SHA256(option.textValue).toString(), option.textValue)
        : undefined;
    });

    return PrdInfo.mapToArray(map);
  }

  /**
   * @description 번역된 해시맵을 통해 PrdInfo와 하위 정보의 모든 한글 텍스트에 대한 번역 값을 적용
   * @param array 번역된 해시맵
   */
  importTranslatedText(array: Array<[string, string]>): void {
    const SHA256 = require('crypto-js/sha256');
    const map = PrdInfo.arrayToMap(array);
    if (this.title !== undefined)
      this.translatedTitle = map.get(SHA256(this.title).toString());

    this.options.forEach((option, idx) => {
      if (option.title !== undefined)
        this.options[idx].translatedTitle = map.get(
          SHA256(option.title).toString()
        );
      // Attrs 번역
      option.attributes?.forEach((attr, attrIdx) => {
        if (attr.name !== undefined && this.options[idx].attributes)
          this.options[idx].attributes![attrIdx].translatedName = map.get(
            SHA256(attr.name).toString()
          );
      });
      // TextValue 번역
      if (option.textValue !== undefined && this.options[idx].textValue)
        this.options[idx].translatedTextValue = map.get(
          SHA256(option.textValue).toString()
        );
    });
  }

  /**
   * @description JSON으로 변환
   */
  toJSON(): any {
    const mapToArray = this.optionPriceMap?.entries() ?? [];
    return {
      ...this,
      options: this.options.map(option => option.toJSON()),
      optionPriceMap: Array.from(mapToArray),
    };
  }

  /**
   * @description JSON에서 변환
   */
  static fromJSON(data: any): PrdInfo {
    const prdInfo = Object.assign(new PrdInfo(), data);
    if (data.options !== undefined)
      prdInfo.options = data.options.map(PrdOption.fromJSON);
    if (data.optionPriceMap !== undefined)
      prdInfo.optionPriceMap = new Map(data.optionPriceMap);
    return prdInfo;
  }

  clone(): PrdInfo {
    return PrdInfo.fromJSON(this.toJSON());
  }

  hash(): string {
    const SHA256 = require('crypto-js/sha256');
    return SHA256(JSON.stringify(this.toJSON())).toString();
  }
}
