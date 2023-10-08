/* eslint-disable @typescript-eslint/no-explicit-any */
import ProductInfo from './ProductInfo';
import ProductOptionBuilder from './ProductOptionBuilder';

export default class ProductInfoBuilder {
  prd: ProductInfo;

  constructor() {
    this.prd = new ProductInfo();
  }

  url(url: string) {
    this.prd.url = url;
    return this;
  }

  sitename(sitename: string) {
    this.prd.sitename = sitename;
    return this;
  }

  category(category: string) {
    this.prd.category = category;
    return this;
  }

  thumbnailUrls(thumbnailURL: string[]) {
    this.prd.thumbnailUrls = thumbnailURL;
    return this;
  }

  fetchedTime(fetchedTime: number) {
    this.prd.fetchedTime = fetchedTime;
    return this;
  }

  originTitle(title: string) {
    this.prd.originTitle = title;
    return this;
  }

  translatedTitle(translatedTitle: string) {
    this.prd.translatedTitle = translatedTitle;
    return this;
  }

  originLanguage(originLanguage: string) {
    this.prd.originLanguage = originLanguage;
    return this;
  }

  translatedLanguage(translatedLanguage: string) {
    this.prd.translatedLanguage = translatedLanguage;
    return this;
  }

  fromCurrency(fromCurrency: string) {
    this.prd.fromCurrency = fromCurrency;
    return this;
  }

  toCurrency(toCurrency: string) {
    this.prd.toCurrency = toCurrency;
    return this;
  }

  currencyRate(currencyRate: number) {
    this.prd.currencyRate = currencyRate;
    this.prd.exchangedPrice = {
      defaultPrice: this.prd.originPrice?.defaultPrice
        ? this.prd.originPrice.defaultPrice * currencyRate
        : undefined,
      discountPrice: this.prd.originPrice?.discountPrice
        ? this.prd.originPrice.discountPrice * currencyRate
        : undefined,
      couponPrice: this.prd.originPrice?.couponPrice
        ? this.prd.originPrice.couponPrice * currencyRate
        : undefined,
    };
    return this;
  }

  originPrice(originPrice: {
    defaultPrice?: number;
    discountPrice?: number;
    couponPrice?: number;
  }) {
    this.prd.originPrice = originPrice;
    return this;
  }

  exchangedPrice(exchangedPrice: {
    defaultPrice?: number;
    discountPrice?: number;
    couponPrice?: number;
  }) {
    this.prd.exchangedPrice = exchangedPrice;
    return this;
  }

  expectedDeliveryTime(expectedDeliveryTime: string) {
    this.prd.expectedDeliveryTime = expectedDeliveryTime;
    return this;
  }

  expectedDeliveryFee(expectedDeliveryFee: number) {
    this.prd.expectedDeliveryFee = expectedDeliveryFee;
    return this;
  }

  expectedTariff(expectedTariff: number) {
    this.prd.expectedTariff = expectedTariff;
    return this;
  }

  requiredOptions(OptionBuilders: ProductOptionBuilder[]) {
    this.prd.requiredOptions = OptionBuilders.map(builder => builder.build());
    return this;
  }

  extraOptions(OptionBuilders: ProductOptionBuilder[]) {
    this.prd.extraOptions = OptionBuilders.map(builder => builder.build());
    return this;
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
   * @description 번역을 위해 ProductInfo와 하위 정보의 모든 한글 텍스트를 Hash값과 문자열로 이루어진 맵으로 변환
   */
  exportOriginalText(): Array<[string, string]> {
    const SHA256 = require('crypto-js/sha256');
    const map = new Map<string, string>();
    if (this.prd.originTitle !== undefined)
      map.set(SHA256(this.prd.originTitle).toString(), this.prd.originTitle);
    // 필수옵션 export
    this.prd.requiredOptions.forEach(option => {
      if (option.title !== undefined)
        map.set(SHA256(option.title).toString(), option.title);
      option.attributes?.forEach(attr => {
        if (attr.name !== undefined)
          map.set(SHA256(attr.name).toString(), attr.name);
      });
    });
    // ExtraOptions export
    this.prd.extraOptions.forEach(option => {
      if (option.title !== undefined)
        map.set(SHA256(option.title).toString(), option.title);
      option.attributes?.forEach(attr => {
        if (attr.name !== undefined)
          map.set(SHA256(attr.name).toString(), attr.name);
      });
    });
    return ProductInfoBuilder.mapToArray(map);
  }

  /**
   * @description 번역된 해시맵을 통해 ProductInfo와 하위 정보의 모든 한글 텍스트에 대한 번역 값을 적용
   * @param array 번역된 해시맵
   */
  importTranslatedText(array: Array<[string, string]>): void {
    const SHA256 = require('crypto-js/sha256');
    const map = ProductInfoBuilder.arrayToMap(array);
    if (this.originTitle !== undefined)
      this.prd.translatedTitle = map.get(SHA256(this.originTitle).toString());

    // 필수옵션 번역
    this.prd.requiredOptions.forEach((option, idx) => {
      if (option.title !== undefined)
        this.prd.requiredOptions[idx].translatedTitle = map.get(
          SHA256(option.title).toString()
        );
      // Attrs 번역
      option.attributes?.forEach((attr, attrIdx) => {
        if (attr.name !== undefined && this.prd.requiredOptions[idx].attributes)
          this.prd.requiredOptions[idx].attributes![attrIdx].translatedName =
            map.get(SHA256(attr.name).toString());
      });
    });
    // ExtraOptions 번역
    this.prd.extraOptions.forEach((option, idx) => {
      if (option.title !== undefined)
        this.prd.extraOptions[idx].translatedTitle = map.get(
          SHA256(option.title).toString()
        );
      // Attrs 번역
      option.attributes?.forEach((attr, attrIdx) => {
        if (attr.name !== undefined && this.prd.extraOptions[idx].attributes)
          this.prd.extraOptions[idx].attributes![attrIdx].translatedName =
            map.get(SHA256(attr.name).toString());
      });
    });
  }

  build() {
    this.prd.id = this.prd.hash();
    return this.prd;
  }
}
