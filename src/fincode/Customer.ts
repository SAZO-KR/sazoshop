export type FincodeCustomerRegisterRequestSchema = {
  id?: string; // 顧客ID, 문자열, 1에서 60자 사이
  name?: string; // 顧客名, 문자열, 1에서 384자 사이
  email?: string; // 顧客メールアドレス, 문자열, 1에서 254자 사이
  phone_cc?: string; // 電話番号の国コード, 문자열, 1에서 3자 사이
  phone_no?: string; // 電話番号, 문자열, 1에서 15자 사이
  addr_city?: string; // カード顧客の請求書住所の都市, 문자열, 1에서 50자 사이
  addr_country?: string; // 国コード, 문자열, 1에서 3자 사이
  addr_line_1?: string; // カード顧客の請求書住所の区域部分의 1行目, 문자열, 1에서 50자 사이
  addr_line_2?: string; // カード顧客の請求書住所の区域部分의 2行目, 문자열, 1에서 50자 사이
  addr_line_3?: string; // カード顧客の請求書住所の区域部分의 3行目, 문자열, 1에서 50자 사이
  addr_post_code?: string; // カード顧客の請求書住所の郵便番号, 문자열, 1에서 16자 사이
  addr_state?: string; // カード顧客の請求書住所의 州または都道府県コード, 문자열, 1에서 3자 사이
};

export type FincodeCustomerRegisterResponseSchema = {
  id: string; // 顧客ID
  name: string; // 顧客名
  email: string; // 顧客メールアドレス
  phone_cc: string; // 電話番号の国コード
  phone_no: string; // 電話番号
  addr_city: string; // 顧客の請求先住所の都市
  addr_country: string; // 顧客の請求先住所の国コード
  addr_line_1: string; // 顧客の請求先住所の区域部分の1行目
  addr_line_2: string; // 顧客の請求先住所の区域部分の2行目
  addr_line_3: string; // 顧客の請求先住所の区域部分の3行目
  addr_post_code: string; // 顧客の請求先住所の郵便番号
  addr_state: string; // 顧客の請求先住所の州または都道府県コード
  card_registration: string; // 決済手段登録 0:なし 1:あり
  created: string; // 作成日時 YYYY/MM/dd HH:mm:ss.SSS形式 ^(\d{4})/(\d{2})/(\d{2}) (\d{2}):(\d{2}):(\d{2}).(\d{3})$
  updated: string; // 更新日時 YYYY/MM/dd HH:mm:ss.SSS形式 ^(\d{4})-(\d{2})-(\d{2}) (\d{2}):(\d{2}):(\d{2}).(\d{3})$
};
