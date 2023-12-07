type ProductCardSchema = {
  productName: string; // 상품명
  translatedProductName: string; // 번역된 상품명
  originalPrice: number; // 원래 가격
  discountPrice: number; // 할인된 가격
  exchangeOriginalPrice: number; // 환율 적용 가격
  exchangeDiscountPrice: number; // 환율 적용 가격
  discountRate: number; // 할인율
  mallurl: string; // 쇼핑몰 URL
  imageUrl: string; // 상품 이미지 URL
  expectedshippingfee?: number; // 예상 배송비
  starRating?: number; // 별점
  reviewCount?: number; // 리뷰 수
};

export default ProductCardSchema;
