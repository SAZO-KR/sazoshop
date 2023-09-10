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
  console.log('Selectable Attributes 1 ', prdinfo.selectableAttributes(0));
  const attrs1 = prdinfo.selectableAttributes(0);
  console.log('Select Attribute1 : "1"');
  if (attrs1 !== undefined) prdinfo.selectAttribute(0, attrs1[0].id);
  console.log('Select Attribute2 : "11"');
  const attrs2 = prdinfo.selectableAttributes(1);
  if (attrs2 !== undefined) prdinfo.selectAttribute(1, attrs2[0].id);
  console.log('Selectable Attributes 3 ', prdinfo.selectableAttributes(2));

  it('should be 1', () => {
    expect(prdinfo.selectableAttributes(2)?.length).to.equal(1);
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
