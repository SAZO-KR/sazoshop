import { FC, useEffect, useState } from "react";
import {Button, Container, TextField} from '@mui/material';
import { PrdInfo, PrdInfoBuilder } from "sazoshop";

const getProduct = async (url: string): Promise<PrdInfoBuilder> => {
    const res  = await fetch(
        'https://asia-northeast1-sazokr.cloudfunctions.net/dev_prdinfoFromURL',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ url }),
        }
      );
    const result = await res.json();
    console.log('result', result);
    const builder = PrdInfoBuilder.fromJSON(result);
    return builder;
}

const ProductsTest: FC = () => {
    let builder: PrdInfoBuilder;
    const [url, setUrl] = useState('');
    const [prdInfo, setPrdInfo] = useState<PrdInfo | null>(null);

    const handleClick = async () => {
        builder = await getProduct(url);
        const prd = builder.build();
        setPrdInfo(prd);
    }

    const selectAtrr = (optionIdx: number, attrId:string)=>{
        if (!prdInfo) return;
        prdInfo.selectAttribute(optionIdx, attrId);
        setPrdInfo(PrdInfoBuilder.fromJSON(prdInfo.toJSON()).build());
    }

    useEffect(() => {
        console.log('prdInfo', prdInfo);
    }, [prdInfo]);

    return (
        <Container sx={{display:'flex', flexDirection: 'column'}}>
            <TextField id="outlined-basic" label="URL" variant="outlined" onChange={(event)=>{
                setUrl(event.target.value);
            }}/>
            <Button onClick={handleClick}> Get Product info</Button>
            <Container>
                <h1>Product Info</h1>
                {prdInfo && (
                    <Container>
                        <h2>Options</h2>
                        {prdInfo.options.map((option, optionIdx) => (
                            <Container key={optionIdx}>
                                <h3>{option.title}</h3>
                                <Container>
                                    {prdInfo.selectableAttributes(optionIdx)?.map((attr, attrIdx) => (
                                        <Button key={attrIdx} onClick={()=>{
                                            selectAtrr(optionIdx, attr.id);
                                        }}>
                                            {attr.id}
                                        </Button>
                                    ))}
                                </Container>
                            </Container>
                        ))}
                    </Container>
                )}

            </Container>
            <Button onClick={()=>{
                console.log(prdInfo?.isSelectableAttribute(0, ''))
            }}>
                Select
            </Button>
        </Container>
    );
};

export default ProductsTest;