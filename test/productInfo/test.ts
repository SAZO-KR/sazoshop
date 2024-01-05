import {describe, it, test} from 'mocha';
import {
  ProductAttributeBuilder,
  ProductInfoBuilder,
  ProductOptionBuilder,
} from '../../src';
import {expect} from 'chai';

// describe('옵션 종속성 테스트', () => {
//   const builder = new ProductInfoBuilder().originTitle('sample Data');
//   const productInfo = builder.build();

//   it('should be opt1,2,3', () => {
//     console.log(productInfo.toJSON());
//   });
// });

describe('pcodeTest', () => {
  const title = '루루홈 클리어 그래피티 에어팟 케이스';
  const optionName = '에어팟 3세대';
  const price = 12800;

  const required = [
    new ProductOptionBuilder('manual').attributes([
      new ProductAttributeBuilder(optionName).name(optionName).price(price),
    ]),
  ];

  //ProductInfo 빌드
  const builder = new ProductInfoBuilder()
    .originTitle(title)
    .url(
      'https://www.coupang.com/vp/products/7385671924?vendorItemId=86206216392&searchId=f6c69621056e4ba4b89dd97d7564f221&rmdId=f6c69621056e4ba4b89dd97d7564f221&eventLabel=recommendation_widget_pc_srp_001&platform=web&rmdABTestInfo=39752:A&rmdValue=p7728553529:vt-1.0.0:p7385671924&isAddedCart='
    )
    .sitename('manual')
    .requiredOptions(required);

  const productInfo = builder.build();

  it('should be opt1,2,3', () => {
    console.log(productInfo);
  });
});
