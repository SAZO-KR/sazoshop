import {OptionTypeError} from './Error';
import PrdAttr from './PrdAttr';
import PrdAttrBuilder from './PrdAttrBuilder';
import PrdOption from './PrdOption';

export default class PrdOptionBuilder {
  option: PrdOption;

  /**
   * @description 옵션 빌더 생성 옵션의 제목을 설정. 옵션의 타입의 기본값은 SELECT로 설정 옵션의 의존성 기본값은 false로 설정
   * @param title 옵션의 제목
   */
  constructor(title: string) {
    this.option = new PrdOption(title);
    this.option.title = title;
    this.option.hasDependency = false;
  }

  /**
   *
   * @param type 옵션의 타입을 명시적으로 설정 반드시 TEXT 또는 SELECT로 설정 기본값은 SELECT
   * @returns
   */
  type(type: 'TEXT' | 'SELECT') {
    this.option.type = type;
    return this;
  }

  /**
   * @description 옵션에 의존성이 있는 지 설정 기본값은 false
   */
  hasDependency(hasDependency: boolean) {
    this.option.hasDependency = hasDependency;
    return this;
  }

  /**
   * @description 옵션에 속성을 한번에 추가. type이 SELECT일 때만 사용가능.
   * @param attrbuilder[] 추가할 속성의 빌더 배열
   * @throws type이 SELECT가 아닐 때
   */
  attributes(attrbuilder: PrdAttrBuilder[]) {
    if (this.option.type !== 'SELECT')
      throw new OptionTypeError('The Option type must be SELECT.');
    const attributes: PrdAttr[] = [];
    attrbuilder.forEach(builder => {
      attributes.push(builder.build());
    });
    this.option.attributes = attributes;
    return this;
  }

  /**
   * @description 옵션에 선택지(속성)을 추가. type이 SELECT일 때만 사용가능
   * @param attrbuilder 추가할 속성의 빌더
   * @throws type이 SELECT가 아닐 때
   */
  addAttributes(attrbuilder: PrdAttrBuilder[]) {
    if (this.option.type !== 'SELECT')
      throw new OptionTypeError('The Option type must be SELECT.');
    const attributes: PrdAttr[] = [];
    attrbuilder.forEach(builder => {
      attributes.push(builder.build());
    });
    if (this.option.attributes === undefined)
      this.option.attributes = attributes;
    else this.option.attributes = this.option.attributes.concat(attributes);
    return this;
  }

  /**
   * @description 텍스트 옵션의 기본값을 설정. type이 TEXT일 때만 사용가능
   * @param value 옵션의 입력값
   * @throws type이 TEXT가 아닐 때
   */
  textDefaultValue(value: string) {
    if (this.option.type !== 'TEXT')
      throw new OptionTypeError('The Option type must be TEXT.');
    this.option.textValue = value;
    return this;
  }

  build() {
    return this.option;
  }
}
