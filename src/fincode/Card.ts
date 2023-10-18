export type CardRegisterRequestSchema = {
  default_flag: '1' | '0'; // デフォルトフラグ 1:ON 0:OFF, 문자열, 1 글자, 필수
  token: string; // トークン（fincodeJSのカードトークン発行より返却される値）, 문자열, 1에서 512자 사이, 필수
};

export type CardRegsiterResponseSchema = {
  customer_id: string; // 顧客ID, 문자열, 1에서 60자 사이
  id: string; // カードID, 문자열, 고정된 길이 25자
  default_flag: '1' | '0'; // デフォルトフラグ 1:ON 0:OFF, 문자열, 1 글자
  card_no: string; // マスクされた下四桁のカード番号が返却されます。:************9999, 문자열, 1에서 16자 사이
  expire: string; // カードの有効期限。yymm形式, 문자열, 고정된 길이 4자
  holder_name: string; // カード名義人, 문자열, 1에서 50자 사이
  card_no_hash: string; // カード番号ハッシュ値, 문자열, 1에서 64자 사이
  created: string; // 作成日時 YYYY/MM/dd HH:mm:ss.SSS形式, 문자열
  updated: string; // 更新日時 YYYY/MM/dd HH:mm:ss.SSS形式, 문자열
  /**
   * カード種別, 문자열, 1 글자
   *
   * 0 - 不明
   * 1 - デビットカード
   * 2 - プリペイドカード
   * 3 - クレジットカード
   */
  type: '0' | '1' | '2' | '3';
  /**
   * 国際ブランド, 문자열, 1에서 50자 사이
   *
   * 判別出来ない場合は、 空文字になります。
   * VISA
   * MASTER
   * JCB
   * AMEX
   * DINERS
   */
  brand: '' | 'VISA' | 'MASTER' | 'JCB' | 'AMEX' | 'DINERS';
};

export type CardSchema = {
  customer_id: string; // 顧客ID
  default_flag: '1' | '0'; // デフォルトカードフラグ
  card_no: string;
  expire: string;
  holder_name?: string; // カード名義人
  security_code?: string;
  card_no_hash?: string;
  created?: string;
  updated?: string;
  type?: string;
  brand?: string;
};
