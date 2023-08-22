import {PrdAttrBuilder, PrdOptionBuilder, PrdInfoBuilder} from '../../../src';

export const dependencyData = new PrdInfoBuilder().options([
  new PrdOptionBuilder('opt1').attributes([
    new PrdAttrBuilder('1').name('opt1-attr1'),
    new PrdAttrBuilder('2').name('opt1-attr2'),
    new PrdAttrBuilder('3').name('opt1-attr3'),
    new PrdAttrBuilder('4').name('opt1-attr4'),
    new PrdAttrBuilder('5').name('opt1-attr5'),
  ]),
  new PrdOptionBuilder('opt2').attributes([
    new PrdAttrBuilder('11').name('opt2-attr1').dependency(['1']),
    new PrdAttrBuilder('12').name('opt2-attr2').dependency(['2']),
    new PrdAttrBuilder('13').name('opt2-attr3').dependency(['2']),
    new PrdAttrBuilder('14').name('opt2-attr4').dependency(['3']),
    new PrdAttrBuilder('15').name('opt2-attr5').dependency(['4']),
    new PrdAttrBuilder('16').name('opt2-attr6').dependency(['5']),
  ]),
  new PrdOptionBuilder('opt3').attributes([
    new PrdAttrBuilder('21').name('opt3-attr1').dependency(['1', '11']),
    new PrdAttrBuilder('22').name('opt3-attr2').dependency(['2', '12']),
    new PrdAttrBuilder('23').name('opt3-attr3').dependency(['3', '14']),
    new PrdAttrBuilder('24').name('opt3-attr4').dependency(['4', '15']),
    new PrdAttrBuilder('25').name('opt3-attr5').dependency(['5', '16']),
  ]),
]);

export const normalData = new PrdInfoBuilder()
  .options([
    new PrdOptionBuilder('opt1').attributes([
      new PrdAttrBuilder('1').name('opt1-attr1').price(10000),
      new PrdAttrBuilder('2').name('opt1-attr2').price(20000),
    ]),
    new PrdOptionBuilder('opt2').attributes([
      new PrdAttrBuilder('11').name('opt2-attr1').price(1000),
      new PrdAttrBuilder('12').name('opt2-attr2').price(2000),
      new PrdAttrBuilder('13').name('opt2-attr3').price(3000),
      new PrdAttrBuilder('14').name('opt2-attr4').price(4000),
    ]),
  ])
  .title('sample Data')
  .salePrice(10000);
