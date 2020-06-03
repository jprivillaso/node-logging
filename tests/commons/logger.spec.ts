import Logger from '../../src/commons/logger';
import { expect } from 'chai';
import 'mocha';

describe('Logger tests', () => {
  const key = 'test';

  before(() => {
    const date1 = new Date('2020-12-01T04:15:00.000Z');
    Logger.add({
      key,
      value: 1,
      timestamp: date1.valueOf()
    });

    const date2 = new Date('2020-12-01T04:25:00.000Z');
    Logger.add({
      key,
      value: 1,
      timestamp: date2.valueOf()
    });

    const date3 = new Date('2020-12-01T05:20:00.000Z');
    Logger.add({
      key,
      value: 1,
      timestamp: date3.valueOf()
    });

    const date4 = new Date('2020-12-01T05:25:00.000Z');
    Logger.add({
      key,
      value: 1,
      timestamp: date4.valueOf()
    });
  });

  it('Should omit the first value in the sum', () => {
    const referenceDate = new Date('2020-12-01T05:25:00.000Z');
    const result = Logger.getSum(key, referenceDate.valueOf());
    expect(result).to.equal(3);
  });
});