import { formatCurrency } from '../../scripts/utils/money.js';

describe('Test Suite: formatCurrency', () => {
  it('converts paise to ₹', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('Works with 0', () => {
    expect(formatCurrency(0)).toEqual('0.00');
  });

  it('Round of case equal to 5' , () => {
    expect(formatCurrency(2000.5)).toEqual('20.01');
  });

  it('Round of case below 5', () => {
    expect(formatCurrency(2000.4)).toEqual('20.00')
  });
});



