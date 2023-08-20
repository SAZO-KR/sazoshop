import sha256 from "crypto-js/sha256";
import PrdInfo from "./PrdInfo";
import PrdOptionBuilder from "./PrdOptionBuilder";

export default class PrdInfoBuilder {
  prd: PrdInfo;

  constructor() {
    this.prd = new PrdInfo();
  }

  title(title: string) {
    this.prd.title = title;
    return this;
  }

  sitename(sitename: string) {
    this.prd.sitename = sitename;
    return this;
  }

  url(url: string) {
    this.prd.url = url;
    return this;
  }

  originPrice(originPrice: number) {
    this.prd.originPrice = originPrice;
    return this;
  }

  salePrice(salePrice: number) {
    this.prd.salePrice = salePrice;
    return this;
  }

  translatedTitle(translatedTitle: string) {
    this.prd.translatedTitle = translatedTitle;
    return this;
  }

  thumbnailURL(thumbnailURL: string) {
    this.prd.thumbnailURL = thumbnailURL;
    return this;
  }

  isRocketDelivery(isRocketDelivery: boolean) {
    this.prd.isRocketDelivery = isRocketDelivery;
    return this;
  }

  deliveryFee(deliveryFee: number) {
    this.prd.deliveryFee = deliveryFee;
    return this;
  }

  option(OptionBuilder: PrdOptionBuilder) {
    const option = OptionBuilder.build();
    // 옵션이 없을 때
    if (this.options.length === 0) {
      this.prd.options.push(option);
      return this;
    }
    // 옵션이 있을 때
    option.prevOption = this.prd.options[this.prd.options.length - 1];
    this.prd.options.push(option);
    return this;
  }

  options(OptionBuilders: PrdOptionBuilder[]) {
    OptionBuilders.forEach((builder) => {
      this.option(builder);
    });
    return this;
  }

  optionPriceMap(optionPriceMap: Map<string, number>) {
    this.prd.optionPriceMap = optionPriceMap;
    return this;
  }

  toJSON() {
    return this.prd.toJSON();
  }

  static fromJSON(data: any): PrdInfoBuilder {
    const builder = new PrdInfoBuilder();
    builder.prd = PrdInfo.fromJSON(data);
    return builder;
  }

  // Map을 배열로 변환
  private static readonly mapToArray = (
    map: Map<string, string>
  ): Array<[string, string]> => Array.from(map.entries());

  // 배열을 Map으로 복원
  private static readonly arrayToMap = (
    arr: Array<[string, string]>
  ): Map<string, string> => new Map(arr);

  /**
   * 번역을 위해 PrdInfo와 하위 정보의 모든 한글 텍스트를 Hash값과 문자열로 이루어진 맵으로 변환
   */
  exportOriginalText(): Array<[string, string]> {
    const map = new Map<string, string>();
    if (this.prd.title !== undefined)
      map.set(sha256(this.prd.title).toString(), this.prd.title);
    this.prd.options.forEach((option) => {
      if (option.title !== undefined)
        map.set(sha256(option.title).toString(), option.title);
      option.attributes.forEach((attr) => {
        if (attr.name !== undefined)
          map.set(sha256(attr.name).toString(), attr.name);
      });
    });

    return PrdInfoBuilder.mapToArray(map);
  }

  /**
   * 번역된 해시맵을 통해 PrdInfo와 하위 정보의 모든 한글 텍스트에 대한 번역 값을 적용
   */
  importTranslatedText(array: Array<[string, string]>): void {
    const map = PrdInfoBuilder.arrayToMap(array);
    if (this.prd.title !== undefined)
      this.prd.translatedTitle = map.get(sha256(this.prd.title).toString());

    this.prd.options.forEach((option, idx) => {
      if (option.title !== undefined)
        this.prd.options[idx].translatedTitle = map.get(
          sha256(option.title).toString()
        );
      option.attributes.forEach((attr, attrIdx) => {
        if (attr.name !== undefined)
          this.prd.options[idx].attributes[attrIdx].translatedName = map.get(
            sha256(attr.name).toString()
          );
      });
    });
  }

  build() {
    return this.prd;
  }
}
