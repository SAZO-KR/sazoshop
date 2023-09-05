import {useState} from 'react';
import {PrdInfo, PrdInfoBuilder} from 'sazoshop';

// http://item.gmarket.co.kr/Item?goodsCode=3063598616
const prdInfoFromUrlDemo = async (): Promise<object> => {
  await new Promise(resolve => setTimeout(resolve, 3000)); // 3초 대기
  return {
    options: [
      {
        title: '색상',
        attributes: [
          {id: '블랙', price: 0},
          {id: '블루', price: 0},
        ],
      },
      {
        title: '사이즈',
        attributes: [
          {id: 'Free', price: 0, dependency: ['블랙']},
          {id: 'Free', price: 0, dependency: ['블루']},
        ],
        prevOption: {
          title: '색상',
          attributes: [
            {id: '블랙', price: 0},
            {id: '블루', price: 0},
          ],
        },
      },
    ],
    title:
      '(15%쿠폰:21.080원)스타일아유 여성 캐주얼 후드 청자켓 데일리 데님자켓AZA3JK0052',
    sitename: 'gmarket',
    originPrice: 82600,
    salePrice: 24800,
    thumbnailURL: '//gdimg.gmarket.co.kr/3063598616/still/400?ver=1689361112',
    optionPriceMap: [],
  };
};
const prdInfoFromUrl = async (url: string): Promise<object> => {
  const res = await fetch(
    'https://asia-northeast1-sazokr.cloudfunctions.net/dev_prdinfoFromURL',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({url}),
    }
  );
  return res.json();
};

const App = () => {
  const [prdInfo, setPrdInfo] = useState<PrdInfo | undefined>(undefined);

  const demoFetchButton = async () => {
    const res = await prdInfoFromUrlDemo();
    try {
      const builder = PrdInfoBuilder.fromJSON(res);
      setPrdInfo(builder.build());
    } catch (error) {
      console.error(error);
    }
  };
  const fetchButton = async () => {
    const url = 'http://item.gmarket.co.kr/Item?goodsCode=3063598616';
    try {
      const res = await prdInfoFromUrl(url);
      console.log(res);
      const builder = PrdInfoBuilder.fromJSON(res);
      setPrdInfo(builder.build());
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <button className="action-button" onClick={demoFetchButton}>
        Demo Fetch
      </button>
      <button className="action-button" onClick={fetchButton}>
        Fetch
      </button>
      {prdInfo && (
        <div className="product-info">
          <div> Title: {prdInfo.title}</div>
          <div> Origin Price: {prdInfo.originPrice}</div>
          <div> Sale Price: {prdInfo.salePrice}</div>
          <div> Thumbnail URL: {prdInfo.thumbnailURL}</div>
          <div> Options: {JSON.stringify(prdInfo.options)}</div>
        </div>
      )}
    </div>
  );
};

export default App;
