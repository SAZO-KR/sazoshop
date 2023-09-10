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
  // 각각 옵션 선택
  console.log('Selectable Attrs of opt0', prdinfo.selectableAttributes(0));
  console.log('select attrId=1');
  if (prdinfo.options[0].attributes === undefined) return;
  prdinfo.selectAttribute(0, '3');
  console.log('Selectable Attrs of opt1', prdinfo.selectableAttributes(1));
  console.log('Is selectable?', prdinfo.isSelectableAttribute(1, '11'));
  console.log('select attrId=11');
  if (prdinfo.options[1].attributes === undefined) return;
  prdinfo.selectAttribute(1, '16');
  console.log('Selectable Attrs of opt2', prdinfo.selectableAttributes(2));

  // 선택가능 옵션 0

  // 선택된 옵션 확인
  it('should be eqaul to 2', () => {
    expect(prdinfo.selectableAttributes(1)?.length).to.equal(2); // 14, 16
  });
  it('should be true', () => {
    expect(prdinfo.isSelectableAttribute(2, '24')).to.be.true;
  });
  // // 세번째 옵션 선택 가능한 속성 확인
  // it('should be 1', () => {
  //   expect(prdinfo.selectableAttributes(2)?.length).to.equal(1);
  // });
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
