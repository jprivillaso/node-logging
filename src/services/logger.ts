import Logger from '../commons/logger';

export const addMetric = (key: string, value: number): void => {
  const timestamp = new Date().valueOf();
  Logger.add({ key, value, timestamp });
};

export const getSum = (key: string): number => {
  const timestamp = new Date().valueOf();
  return Logger.getSum(key, timestamp);
}
