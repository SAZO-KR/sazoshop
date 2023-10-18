/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, {AxiosResponse} from 'axios';
import {CardSchema} from './Card';

export default class Fincode {
  private static instance: Fincode;
  config: {
    api: {
      host: string;
      context: string;
    };
    headers: {
      accept: string;
      contentType: string;
      tenantShopId: string;
      idempotentKey: string;
    };
    apiKey: string;
  };

  private constructor(publicKey: string) {
    this.config = {
      api: {
        host: 'https://api.test.fincode.jp/',
        context: 'v1',
      },
      headers: {
        accept: 'application/json',
        contentType: 'application/json',
        tenantShopId: '',
        idempotentKey: '',
      },
      apiKey: publicKey,
    };
  }

  public static getInstance(publicKey: string): Fincode {
    if (!Fincode.instance) {
      Fincode.instance = new Fincode(publicKey);
    }

    return Fincode.instance;
  }

  /// * Methods
  /**
   * @description Shop IDを設定する
   * @param tenantShopId
   */
  setTenantShopId(tenantShopId: string): void {
    this.config.headers.tenantShopId = tenantShopId;
  }
  /**
   * @description Idempotency Keyを設定する
   * @param idempotentKey
   */
  setIdempotentKey(idempotentKey: string): void {
    this.config.headers.idempotentKey = idempotentKey;
  }
  /**
   * @desciption Tokenを取得する
   * @param cardInfo カード情報
   * @returns
   */
  async getTokens(cardInfo: CardSchema): Promise<{
    list: {token: string}[];
    expired: string;
    card_no: string;
    security_code_set: string;
  }> {
    const endpoint = `${this.config.api.host}${this.config.api.context}/tokens/cards`;
    // Request
    const res = await this.request(endpoint, 'POST', cardInfo);
    return res.data;
  }
  /**
   * @description カード情報を登録する
   * @param cardInfo カード情報
   */
  async registerCard(cardInfo: CardSchema) {
    const endpoint = `${this.config.api.host}${this.config.api.context}/customers/${cardInfo.customer_id}/cards`;
    // Request
    const res = await this.request(endpoint, 'POST', cardInfo);
    return res.data;
  }

  /// * Private Methods
  /**
   * @description Requestを送信する
   * @param endpoint
   * @param data
   */
  private async request(
    endpoint: string,
    method: string,
    data?: any
  ): Promise<AxiosResponse<any, any>> {
    const headers = {
      Accept: this.config.headers.accept,
      'Content-Type': this.config.headers.contentType,
      Authorization: 'Bearer ' + this.config.apiKey,
      'Tenant-Shop-Id': this.config.headers.tenantShopId ?? '',
      idempotent_key: this.config.headers.idempotentKey ?? '',
    };
    return axios({
      method,
      url: endpoint,
      data,
      headers,
    });
  }
}
