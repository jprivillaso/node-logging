import { MetricBody } from "./types";

export function validatePathParameters(key: string) {
  return key && typeof key === 'string';
}

export function validatePostBody(value: MetricBody) {
  return value && typeof value === 'number';
}