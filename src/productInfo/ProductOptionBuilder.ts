import ProductAttributeBuilder from './ProductAttributeBuilder';
import ProductOption from './ProductOption';

export default class ProductOptionBuilder {
  option: ProductOption;

  /**
   * @description 옵션 빌더 생성 옵션의 제목을 설정. 옵션의 타입의 기본값은 SELECT로 설정
   * @param title 옵션의 제목
   */
  constructor(title: string) {
    this.option = new ProductOption(title);
  }

  /**
   * @param required 옵션의 필수 여부를 설정
   * @returns
   */
  required(required: boolean) {
    this.option.required = required;
    return this;
  }

  /**
   * @description 옵션에 속성을 한번에 추가. type이 SELECT일 때만 사용가능.
   * @param attrbuilder[] 추가할 속성의 빌더 배열
   * @throws type이 SELECT가 아닐 때
   */
  attributes(attrbuilder: ProductAttributeBuilder[]) {
    this.option.attributes = attrbuilder.map(builder => builder.build());
    return this;
  }

  build() {
    return this.option;
  }
}
