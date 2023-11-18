import ProductInfo from '../productInfo/ProductInfo';
import {SearchResultItemSchema} from '../search/SearchResultItemSchema';

export type WishlistItemSchema = {
  [key: string]:
    | string
    | number
    | undefined
    | ProductInfo
    | SearchResultItemSchema;
  type: 'PRODUCT_INFO' | 'SEARCH_RESULT_ITEM';
  item: ProductInfo | SearchResultItemSchema;
  createdAt: number;
};
