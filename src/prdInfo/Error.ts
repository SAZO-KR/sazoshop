/**
 * @description 옵션 타입에 맞지않는 메소드 또는 참조가 일어나는 경우 발생
 * @example
 * const option = new PrdOption();
 * option.setTextValue('텍스트'); // throws OptionTypeError
 */
export class OptionTypeError extends Error {
  constructor(message?: string) {
    super(`This option type does not support this method. \n${message ?? ''}`);
  }
}

/**
 * @description 옵션에 속성이 존재하지 않을 때, 속성을 호출하는 경우에 발생
 * @example
 * const option = new PrdOption();
 * option.selectAttribute('속성id'); // throws OptionNoAttrError
 */
export class OptionNoAttrError extends Error {
  constructor(message?: string) {
    super(`This option has no attributes. \n${message ?? ''}`);
  }
}
