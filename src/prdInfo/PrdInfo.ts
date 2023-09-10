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

  /**
   * @returns {number} 옵션까지 다 합친 가격
   */
  totalPrice(): number {
    // 가격 맵이 있으면 맵에서 찾아서 반환
    if (this.optionPriceMap) {
      const key = '';
      this.options.forEach(opt => {
        key.concat(opt.selectedAttribute()?.id ?? '');
      });
      if (this.optionPriceMap.get(key) === undefined)
        throw new Error('There is no price for this option.');
      return this.optionPriceMap.get(key) ?? 0;
    }
    // 가격 맵이 없으면 옵션 가격을 다 더해서 반환
    let totalPrice = this.salePrice ?? 0;
    this.options.forEach(option => {
      totalPrice += option.selectedAttribute()?.price ?? 0;
    });
    return totalPrice;
  }

  /**
   * @description 번역 된 타이틀을 설정
   */
  setTranslatedTitle(value: string) {
    this.translatedTitle = value;
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
}
