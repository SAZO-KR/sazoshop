/**
 * @description 결제 등록 요청 스키마
 */
export type PaymentRegisterRequestSchema = {
  pay_type: string; // 決済種別 - 결제 유형 (예: Card, Applepay, Konbini, Paypay)
  id?: string; // 取引毎にユニークな値を指定してください。未指定の場合、fincode側で作成して返却します。
  job_code: string; // 処理区分 - 처리 유형 (예: CHECK, AUTH, CAPTURE)
  amount?: string; // 利用金額 - 사용 금액
  tax?: string; // 税送料 - 세금 및 운임
  client_field_1?: string; // 自由項目1 - 사용자 정의 필드 1
  client_field_2?: string; // 自由項目2 - 사용자 정의 필드 2
  client_field_3?: string; // 自由項목3 - 사용자 정의 필드 3
  tds_type: string; // 3Dセキュア利用種別 - 3D 보안 사용 유형 (0 또는 2)
  td_tenant_name?: string; // 3Dセキュア表示店舗名 - 3D 보안 표시 상점 이름
  subscription_id?: string; // サブスクリプションID - 구독 ID
  tds2_type: string; // 3Dセキュア2.0非対応時の動作 - 3D 보안 2.0 지원되지 않을 때의 동작 (2 또는 3)
};

/**
 * @description 공통 응답 스키마
 */
export type SharedResponseSchema = {
  shop_id: string; // ショップID - 13자 이내의 문자열
  id: string; // オーダーID - 1에서 30자 사이의 문자열
  pay_type: string; // 決済種別 - Card, Applepay, Konbini, Paypay 중 하나여야 함
  status: string; // 決済ステータス - UNPROCESSED, CHECKED, AUTHORIZED, CAPTURED, CANCELED, AUTHENTICATED 중 하나여야 함
  access_id: string; // 取引ID - 24자 이내의 문자열
  process_date: string; // 処理日時 - YYYY/MM/dd HH:mm:ss.SSS 형식
  job_code: string; // 処理区分 - CHECK, AUTH, CAPTURE, SALES, CANCEL 중 하나여야 함
  item_code: string; // 商品コード - 7자 문자열
  amount: number; // 利用金額 - 1에서 9999999 사이의 정수
  tax: number; // 税送料 - 0에서 9999999 사이의 정수
  total_amount: number; // 利用金額と税送料의 합계 - 1에서 9999999 사이의 정수
  customer_group_id: string; // 顧客情報共有グループID - 13자 이내의 문자열
  customer_id: string; // 顧客ID - 60자 이내의 문자열
  card_no: string; // マスクされた下四桁のカード番号 - 16자 문자열 (마스크 형식: ************9999)
  card_id: string; // カードID - 25자 문자열
  expire: string; // カード의 유효기간 - yymm 형식
  holder_name: string; // 카드 소유자명 - 50자 이내의 문자열
  card_no_hash: string; // 카드 번호 해시값 - 64자 문자열
  method: string; // 支払方法 - 1(一括), 2(분할), 5(리보) 중 하나여야 함
  pay_times: string; // 支払回수 - 2자 이내의 문자열 (CANCELED 상태의 거래에만 지정 가능)
  forward: string; // 仕向先 - 7자 이내의 문자열
  issuer: string; // イシュア - 7자 이내의 문자열
  transaction_id: string; // トランザクションID - 28자 문자열
  approve: string; // 承認番号 - 7자 이내의 문자열
  auth_max_date: string; // 仮売上 유효기간 - 형식 지정 필요
  client_field_1: string; // 自由項目1 - 100자 이내의 문자열
  client_field_2: string; // 自由項目2 - 100자 이내의 문자열
  client_field_3: string; // 自由項目3 - 100자 이내의 문자열
  tds_type: string; // 3Dセキュア 사용 유형 - 0(사용 안 함), 2(3Dセキュア 2.0 사용) 중 하나여야 함
  tds2_type: string; // 3Dセキュア 2.0 비호환 시 작업 유형 - 2(에러 반환 및 결제 처리 미실시), 3(3D 세큐어 2.0의 인증 없이 오서리 실행 및 결제 처리) 중 하나여야 함
  tds2_ret_url: string; // 가맹점 리턴 URL - 256자 이내의 문자열
  tds2_status: string; // 3D 세큐어 2.0 처리
};

/**
 * @description 결제 등록 응답 스키마
 */
export type PaymentRegisterResponseSchema = {
  merchant_name: string; // 3Dセキュア表示用店舗名
  send_url: string; // エンドポイントURL
  subscription_id: string; // サブスクリプションID
  brand: string; // 国際ブランド
  error_code: string; // エラーコード
  created: string; // 作成日時 YYYY/MM/dd HH:mm:ss.SSS形式
  updated: string; // 更新日時 YYYY/MM/dd HH:mm:ss.SSS形式
} & SharedResponseSchema;

/**
 * @description 결제 실행 요청 스키마
 */
export type AuthorizeRequestSchema = {
  pay_type: string; // 決済種別 - 결제 유형 (예: Card, Applepay, Konbini, Paypay)
  access_id: string; // 取引ID - 거래 ID
  token?: string; // トークン（fincodeJSのカードトークン発行より返却される値） - 토큰 (조건부 필수: 토큰을 입력하거나 customer_id와 card_id를 입력해야 함)
  customer_id?: string; // 顧客ID - 고객 ID (조건부 필수)
  card_id?: string; // カードID - 카드 ID (조건부 필수)
  method?: string; // 支払方法 - 지불 방법 (조건부 필수: AUTH 또는 CAPTURE로 지정한 경우 필수)
  pay_times?: string; // 支払回数 - 지불 횟수
  // 허용된 값: "3", "5", "6", "10", "12", "15", "18", "20", "24"
};

/**
 * @description 결제 실행 응답 스키마
 */
export type AuthorizeResponseSchema = {
  merchant_name: string; // 3Dセキュア表示用店舗名 - 3D Secure 표시용 가게 이름
  send_url: string; // エンドポイントURL - 엔드포인트 URL
  subscription_id: string; // サブスクリプションID - 구독 ID (1에서 25자까지의 문자열)
  brand: string; // 国際ブランド - 국제 브랜드 (VISA, MASTER, JCB, AMEX, DINERS 등)
  error_code: string; // エラーコード - 오류 코드 (11 자리 문자열)
  created: string; // 作成日時 YYYY/MM/dd HH:mm:ss.SSS形式 - 생성 일시 (YYYY/MM/dd HH:mm:ss.SSS 형식의 문자열)
  updated: string; // 更新日時 YYYY/MM/dd HH:mm:ss.SSS形式 - 업데이트 일시 (YYYY/MM/dd HH:mm:ss.SSS 형식의 문자열)
  acs: string; // ACS呼出判定 - ACS 호출 판단 (1 자리 문자열)
  acs_url: string; // 3Dセキュア認証ページURL - 3D Secure 인증 페이지 URL
} & SharedResponseSchema;

/**
 * @description 매출 확정 요청 스키마
 */
export type SalesConfirmationRequestSchema = {
  pay_type: string; // 決済種別 - Card, Applepay, Paypay 중 하나여야 함
  access_id: string; // 取引ID - 24자 이내의 문자열
  method?: string; // 支払方法 - 1(一括), 2(분할), 5(리보) 중 하나여야 함
  pay_times?: string; // 支払回数 - 3, 5, 6, 10, 12, 15, 18, 20, 24 중 하나여야 함 (CANCELED 상태의 거래에만 지정 가능)
};

/**
 * @description 매출 확정 응답 스키마
 */
export type PaymentConfirmationResponseSchema = SharedResponseSchema;
