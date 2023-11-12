import {SearchResultItemSchema} from './SearchResultItemSchema';

export type SearchResponseSchema = {
  originQuery: string;
  translatedQuery: string;
  data: SearchResultItemSchema[];
};
