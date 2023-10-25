export type CustomerRegisterRequestSchema = {
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

export type CustomerGetListRequestSchema = {
  /** 1회에 가져올 데이터의 수 (기본값: 10) */
  limit?: number;
  /** 페이지 번호 (기본값: 1) */
  page?: number;
  /** 총 항목 수만을 가져올지 여부를 결정하는 플래그 (기본값: false) */
  count_only?: boolean;
  /** 정렬 순서 (가능한 값: 'id', 'name', 'email', 'created', 'updated') */
  sort?: 'id' | 'name' | 'email' | 'created' | 'updated' | null;
  /** 고객 ID (1 ~ 60자) */
  id?: string;
  /** 고객 이름 (1 ~ 384자) */
  name?: string;
  /** 고객 이메일 주소 (1 ~ 254자) */
  email?: string;
  /** 생성 날짜 범위의 시작값 (YYYY/MM/DD 형식) */
  created_from?: string;
  /** 생성 날짜 범위의 종료값 (YYYY/MM/DD 형식) */
  created_to?: string;
};

export type CustomerGetListResponseSchema = {
  totla_count?: number;
  last_page?: number;
  current_page?: number;
  limit?: number;
  link_next?: string;
  link_previous?: string;
  list?: CustomerSchema[];
};

export type CustomerUpdateRequestSchema = {
  /** 고객 이름 (1 ~ 384자) */
  name?: string;
  /** 고객 이메일 주소 (1 ~ 254자) */
  email?: string;
  /** 전화번호의 국가 코드 (1 ~ 3자) */
  phone_cc?: string;
  /** 전화번호 (1 ~ 15자) */
  phone_no?: string;
  /** 카드 고객의 청구서 주소 도시 (1 ~ 50자) */
  addr_city?: string;
  /** 국가 코드 (1 ~ 3자) */
  addr_country?: string;
  /** 카드 고객의 청구서 주소 지역 부분의 첫 번째 줄 (1 ~ 50자) */
  addr_line_1?: string;
  /** 카드 고객의 청구서 주소 지역 부분의 두 번째 줄 (1 ~ 50자) */
  addr_line_2?: string;
  /** 카드 고객의 청구서 주소 지역 부분의 세 번째 줄 (1 ~ 50자) */
  addr_line_3?: string;
  /** 카드 고객의 청구서 주소 우편번호 (1 ~ 16자) */
  addr_post_code?: string;
  /** 카드 고객의 청구서 주소의 주 또는 도/도도부현 코드 (1 ~ 3자) */
  addr_state?: string;
};

export type CustomerSchema = {
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
