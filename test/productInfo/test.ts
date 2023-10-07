import {describe, it, test} from 'mocha';
import {ProductInfoBuilder} from '../../src';
import {expect} from 'chai';

describe('옵션 종속성 테스트', () => {
  const builder = new ProductInfoBuilder().originTitle('sample Data');
  const productInfo = builder.build();

  it('should be opt1,2,3', () => {
    console.log(productInfo.toJSON());
  });
});
