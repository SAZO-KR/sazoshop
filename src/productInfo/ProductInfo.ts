/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductAttribute from './ProductAttribute';
import ProductOption from './ProductOption';

/**
 * 상품 정보 클래스
 * @description
 * 상품 정보를 담는 클래스. ProductInfoBuilder를 통해 생성한다.
 * @example
 * const prdInfo = new ProductInfoBuilder().setTitle('상품명').build();
 *
 */
export default class ProductInfo {
  id?: string; // 상품 ID (상품의 원본을 대조할 때 사용)

  url?: string; // 상품 URL

  sitename?: string; // 사이트 이름

  category?: string; // 상품 카테고리

  thumbnailUrls?: string[];

  fetchedTime?: number; // 파싱에 걸린 시간

  // * 상품 텍스트 정보
  originTitle?: string; // 번역 전 타이틀

  translatedTitle?: string; // 번역된 타이틀

  originLanguage?: string; // 번역 전 언어 ex) ko

  translatedLanguage?: string; // 번역된 언어 ex) ja

  // * 환율과 가격 관련 정보
  fromCurrency?: string; // 원본 통화 ex) KRW
  toCurrency?: string; // 환율 목적지 통화 ex) JPY
  currencyRate?: number; // 환율 = toCurrency / fromCurrency

  originPrice?: number; // 원본 가격

  exchangedPrice?: number; // 환율 적용된 가격

  expectedDeliveryTime?: String; // 예상 도착일

  expectedDeliveryFee?: number; // 예상 배송비

  expectedTariff?: number; // 예상 관세

  // * 상품 옵션 관련 정보
  requiredOptions: ProductOption[] = []; // 필수 옵션들
  extraOptions: ProductOption[] = []; // 추가 옵션들

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

  // * 옵션과 속성에 관련한 메소드들=============================
  /**
   *
   * @param optionIdx
   * @param attrId
   * @returns 선택된 속성의 조합 문자열 또는 undefined
   * @throws 옵션 인덱스가 옵션 배열의 길이보다 크거나 같을 때
   * @throws 해당 옵션에 해당 속성이 없을 때
   * @throws 해당 속성이 선택 가능한 속성이 아닐 때
   */
  selectRequiredOption(optionIdx: number, attrId: string): undefined | string {
    if (optionIdx >= this.requiredOptions.length)
      throw new Error('There is no option at this index.');
    if (this.isSelectableAttribute(optionIdx, attrId)) {
      this.requiredOptions[optionIdx].selectedAttributeId = attrId;
      if (this.requiredOptions.length - 1 === optionIdx) {
        return this.printRequiredOptionCombination();
      }
      return undefined;
    }
    throw new Error('This attribute is not selectable.');
  }

  /**
   * @description 선택 옵션 선택
   * @param optionIdx 옵션 인덱스
   * @param attrId 속성 ID
   * @returns 선택된 속성의 조합 문자열 또는 undefined
   */
  selectExtraOption(optionIdx: number, attrId: string): undefined | string {
    if (optionIdx >= this.extraOptions.length)
      throw new Error('There is no option at this index.');
    if (this.isSelectableAttribute(optionIdx, attrId)) {
      this.extraOptions[optionIdx].selectedAttributeId = attrId;
      if (this.extraOptions.length - 1 === optionIdx) {
        return this.printExtraOptionCombination();
      }
      return undefined;
    }
    throw new Error('This attribute is not selectable.');
  }

  /**
   * @description 선택된 필수 옵션의 조합을 출력
   * @returns 선택된 필수 옵션의 조합
   * @example
   * "색상 : 검정 / 사이즈 : 105 /"
   */
  printRequiredOptionCombination(): string {
    const combination = '';
    this.requiredOptions.forEach(option => {
      combination.concat(
        option.title + ' : ' + option.selectedAttributeId ?? 'null' + ' / '
      );
    });
    return combination;
  }
  /**
   * @description 선택된 선택 옵션의 조합을 출력
   * @returns 선택된 선택 옵션의 조합
   * @example
   * "추가구성품 : 안경닦이 /"
   */
  printExtraOptionCombination(): string {
    const combination = '';
    this.extraOptions.forEach(option => {
      combination.concat(
        option.title + ' : ' + option.selectedAttributeId ?? 'null' + ' / '
      );
    });
    return combination;
  }

  /**
   * @description 모든 필수옵션이 선택되었는 지 확인
   * @returns 모든 필수옵션이 선택되었는 지 여부
   */
  isAllRequiredOptionSelected(): boolean {
    return this.requiredOptions.every(option => option.selectedAttributeId);
  }

  /**
   * @description 해당 옵션의 선택가능한 속성 배열을 반환
   * @param optionIdx 옵션 인덱스
   * @return 선택 가능한 속성 배열
   * @throws 옵션 인덱스가 옵션 배열의 길이보다 크거나 같을 때
   */
  selectableRequiredAttributes(
    optionIdx: number
  ): ProductAttribute[] | undefined {
    if (optionIdx >= this.requiredOptions.length)
      throw new Error('There is no option at this index.');
    return this.requiredOptions[optionIdx].attributes?.filter(attr =>
      this.isSelectableAttribute(optionIdx, attr.id)
    );
  }

  /**
   * @description 옵션의 속성이 선택 가능한지 확인. 의존성이 없으면 무조건 true. 의존성이 있으면 의존성이 있는 옵션들이 선택되어 있는지 확인
   * @param optionIdx
   * @param attrId
   * @example
   */
  private isSelectableAttribute(optionIdx: number, attrId: string): boolean {
    const attr: ProductAttribute | undefined = this.requiredOptions[
      optionIdx
    ].attributes?.find(attr => attr.id === attrId);
    if (attr === undefined) return false; // 속성이 없으면 false
    if (!attr.dependency) return true; // 의존성이 없으면 true
    if (optionIdx >= this.requiredOptions.length) return false; // 옵션이 없으면 false
    // 의존성이 있으면 의존성이 있는 옵션들이 선택되어 있는지 확인

    for (let i = 0; i < optionIdx; i++) {
      // i번째 의존성 != i번째 옵션의 선택된 속성 이면 false
      if (attr.dependency[i] !== this.selectedRequiredAttribute(i)?.id) {
        return false;
      }
    }
    return true;
  }
  /**
   * @description index에 해당하는 필수 옵션의 선택된 속성을 반환
   * @param optionIdx 옵션 인덱스
   * @return 선택된 속성
   * @throws 옵션 인덱스가 옵션 배열의 길이보다 크거나 같을 때
   */
  private selectedRequiredAttribute(
    optionIdx: number
  ): ProductAttribute | undefined {
    if (optionIdx >= this.requiredOptions.length)
      throw new Error('Out of index.');
    return this.requiredOptions[optionIdx].attributes?.find(
      attr => attr.id === this.requiredOptions[optionIdx].selectedAttributeId
    );
  }
  /**
   * @description index에 해당하는 선택 옵션의 선택된 속성을 반환
   * @param optionIdx 옵션 인덱스
   * @return 선택된 속성
   * @throws 옵션 인덱스가 옵션 배열의 길이보다 크거나 같을 때
   */
  private selectedExtraAttribute(
    optionIdx: number
  ): ProductAttribute | undefined {
    if (optionIdx >= this.extraOptions.length) throw new Error('Out of index.');
    return this.extraOptions[optionIdx].attributes?.find(
      attr => attr.id === this.extraOptions[optionIdx].selectedAttributeId
    );
  }

  // * 가격과 관련된 메소드들=============================
  /**
   * @description 필수옵션의 가격
   * @returns
   * @throws 필수 옵션 중 선택되지 않은 옵션이 있을 때
   */
  getRequiredOptionPrice(): number {
    let price = 0;
    this.requiredOptions.forEach((option, idx) => {
      if (!this.selectedRequiredAttribute(idx))
        throw new Error('There is no selected attribute.');
      price += this.selectedRequiredAttribute(idx)?.price ?? 0;
    });
    return price;
  }
  /**
   * @description 선택옵션의 가격
   * @returns 선택옵션의 가격
   */
  getExtraOptionPrice(): number {
    let price = 0;
    this.extraOptions.forEach((option, idx) => {
      price += this.selectedExtraAttribute(idx)?.price ?? 0;
    });
    return price;
  }

  /**
   * @description JSON으로 변환
   */
  toJSON(): any {
    const mapToArray = this.optionPriceMap?.entries() ?? [];
    return {
      ...this,
      requiredOptions: this.requiredOptions.map(option => option.toJSON()),
      extraOptions: this.extraOptions.map(option => option.toJSON()),
      optionPriceMap: Array.from(mapToArray),
    };
  }

  /**
   * @description JSON에서 변환
   */
  static fromJSON(data: any): ProductInfo {
    const productInfo = Object.assign(new ProductInfo(), data);
    if (data.options !== undefined)
      productInfo.options = data.options.map(ProductOption.fromJSON);
    if (data.optionPriceMap !== undefined)
      productInfo.optionPriceMap = new Map(data.optionPriceMap);
    return productInfo;
  }

  clone(): ProductInfo {
    return ProductInfo.fromJSON(this.toJSON());
  }

  hash(): string {
    const SHA256 = require('crypto-js/sha256');
    return SHA256(JSON.stringify(this.toJSON())).toString();
  }
}