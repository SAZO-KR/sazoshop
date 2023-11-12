export type SearchResultItemSchema = {
  productName: string;
  translatedProductName: string;
  maker: string;
  translatedMaker: string;
  brand: string;
  translatedBrand: string;
  imageUrl: string;
  originalLowPrice: number;
  exchangeLowPrice: number;
  reviewCount: number;
  starRating: number;
  keepCnt: number;
  attribute: {
    attributeValue: string;
    translatedAttributeValue: string;
    characterValue: string;
    translatedCharacterValue: string;
  };
  openDate: string;
  category: {
    category1Name: string;
    translatedCategory1Name: string;
    category2Name: string;
    translatedCategory2Name: string;
    category3Name: string;
    translatedCategory3Name: string;
    category4Name: string;
    translatedCategory4Name: string;
  };
  mallList: {
    mallName: string;
    translatedMallName: string;
    mallPid: string;
    price: number;
    exchangePrice: number;
    pcMallUrl: string;
  }[];
};
