import {formatCurrency} from "../scripts/utils/money.js"

if (formatCurrency(2005) === '20.05') {
    console.log('passed')
}else {
    console.log('failed')
}

//Edge cases
if (formatCurrency(0) === '0.00') {
    console.log('passed')
}else {
    console.log('failed')
}

if (formatCurrency(2000.5) === '20.01') {
    console.log('passed')
}else {
    console.log('failed')
}
import {formatCurrency} from '../../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('rounds up to the nearest cent', () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });
});