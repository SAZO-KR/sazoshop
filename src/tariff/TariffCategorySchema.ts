import {TariffItemSchema} from './TariffItemSchema';

export type TariffCategorySchema = {
  part: string;
  class: string;
  version: string;
  embeddings: number[];
  table: TariffItemSchema[];
};
