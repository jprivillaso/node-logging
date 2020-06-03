import Logger from '../commons/logger';

export const addMetric = (key: string, value: number): void => {
  Logger.add({ key, value });
};

export const getSum = (key: string): number => Logger.getSum(key);
