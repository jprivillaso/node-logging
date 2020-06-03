import {
  Application,
  Request,
  Response
} from 'express';

import { addMetric, getSum } from '../services/aggreator';
import {
  MALFORMED_REQUEST,
  HTTP_BAD_REQUEST,
  HTTP_SUCCESS,
  HTTP_INTERNAL_ERROR
} from '../commons/constants';
import { MetricBody } from '../commons/types';

function validatePostParameters(key: string) {
  return key && typeof key === 'string';
}

function validatePostBody(value: MetricBody) {
  return value && typeof value === 'number';
}

export default (app: Application) => {
  app.post('/metric/:key', (req: Request,res: Response ) => {
    try {
      const { key } = req.params;
      const { value } = req.body;

      if (
        validatePostParameters(key) &&
        validatePostBody(value)
      ) {
        res.status(HTTP_BAD_REQUEST).json({
          message: MALFORMED_REQUEST
        });
      }

      addMetric(key, value);
      console.log(`Metric [ ${key} ] registered successfully!`);

      res.status(HTTP_SUCCESS).json({});
    } catch (error) {
      res.status(HTTP_INTERNAL_ERROR).json({
        message: error
      })
    }
  });

  app.get('/metric/:key/sum', (req: Request,res: Response ) => {
    const { key } = req.params;
    res.send(`The current sum for the metric [ ${key} ] is: ${getSum(key)}`);
  });
}