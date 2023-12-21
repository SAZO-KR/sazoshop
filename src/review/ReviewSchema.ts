export type ReviewSchema = {
  contents: string;
  created: number;
  updated?: number;
  images?: {imageId: string; imageUrl: string}[];
  creatorInfo: {uid: string; displayName: string; thumbnailImageUrl: string};
  productInfo: {
    id: string;
    productName: string;
    mallUrl: string;
    imageUrl: string;
  }[];
  like?: number;
  tag?: string[];
};
