export type TariffItemSchema = {
  type: string;
  description: string;
  rate: {
    general: string;
    temporary: string;
    wto: string;
    gsp: string;
    ldc: string;
    epa: string;
  };
  code?: string;
  embeddings?: number[];
  category?: string;
  similarity?: number;
};
