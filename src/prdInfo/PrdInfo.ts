/* eslint-disable @typescript-eslint/no-explicit-any */
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
