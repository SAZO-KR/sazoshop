export type TariffItemSchema = {
  type: 'CATEGORY' | 'ITEM'; // CATEGORY | ITEM
  description: string;
  rate: {
    general: string; // 基本税率
    temporary: string; // 暫定税率
    wto: string; // WTO協定;
    gsp: string; // 特恵(一般特恵対象国)
    ldc: string; // 特別特恵(特別特恵税率)
    epa: string; // EPA税率(経済連携協定税率)
  };
  code?: string;
  embeddings?: number[];
  category?: string;
  similarity?: number;
};
