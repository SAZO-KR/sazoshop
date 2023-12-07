type ProductCardSchema = {
  id: number; // 상품 hash ID
  productName: string; // 상품명
  translatedProductName: string; // 번역된 상품명
  price: number; // 원래 가격
  exchangedPrice: number; // 환율 적용 가격
  mallUrl: string; // 쇼핑몰 URL
  imageUrl: string; // 상품 이미지 URL
  expectedshippingfee?: number; // 예상 배송비
  starRating?: number; // 별점
  reviewCount?: number; // 리뷰 수
  priority?: number; // 우선순위
};

export default ProductCardSchema;
