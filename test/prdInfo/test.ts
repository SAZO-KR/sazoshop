import {describe, it, test} from 'mocha';
import {dependencyData} from './sample_data/sample_data';
import {PrdInfo, PrdInfoBuilder} from '../../src';
import {expect} from 'chai';

describe('옵션, 속성을 잘 불러왔는 지 테스트', () => {
  const builder = dependencyData;
  const prdinfo = builder.build();
  test('title', () => {
    it('should be sample Data', () => {
      expect(prdinfo.title).to.equal('sample Data');
    });
  });
  test('option title', () => {
    it('should be opt1,2,3', () => {
      expect(prdinfo.options[0].title).to.equal('opt1');
      expect(prdinfo.options[1].title).to.equal('opt2');
      expect(prdinfo.options[2].title).to.equal('opt3');
    });
  });
});

describe('옵션 선택 시뮬레이션', () => {
  const builder = dependencyData;
  const prdinfo = builder.build();
  // 각각 옵션의 첫번째 속성을 선택
  const attrs1 = prdinfo.options[0].selectableAttributes();
  if (attrs1 !== undefined) prdinfo.options[0].selectAttribute(attrs1[0].id);
  const attrs2 = prdinfo.options[1].selectableAttributes();
  if (attrs2 !== undefined) prdinfo.options[1].selectAttribute(attrs2[0].id);

  // 선택된 옵션 출력
  console.log('[SELECTED OPTION]');
  prdinfo.options.forEach(opt => {
    console.log('option:', opt.title);
    console.log('  select: ', opt.selectedAttributeId);
  });
  test('10000(기본)+10000(옵션1-속성1)+1000(옵션2-속성1)', () => {
    it('should be 21000', () => {
      expect(prdinfo.totalPrice()).to.equal(21000);
    });
  });
});

describe('웹 데이터 샘플로 테스트', () => {
  // Read file
  const fs = require('fs');
  let prdInfo: PrdInfo;
  try {
    const data = fs.readFileSync(
      './test/prdInfo/sample_data/coupang.txt',
      'utf-8'
    );
    prdInfo = PrdInfoBuilder.fromJSON(JSON.parse(data)).build();
    // console.log(prdInfo);
    prdInfo.options.forEach(opt => {
      console.log('option:', opt.title);
    });
    test('Title matching', () => {
      it('', () => {
        expect(prdInfo.title).to.equal(data.title);
      });
    });
    test('Option title', () => {
      it('', () => {
        prdInfo.options.map((opt, i) => {
          expect(opt.title).to.equal(data.options[i].title);
        });
      });
    });
  } catch (error) {
    console.error('An error occurred:', error);
  }
});
