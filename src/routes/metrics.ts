import {
  Application,
  Request,
  Response
} from 'express';

import { addMetric, getSum } from '../services/logger';

import {
  MALFORMED_REQUEST,
  HTTP_BAD_REQUEST,
  HTTP_SUCCESS,
  HTTP_INTERNAL_ERROR
} from '../commons/constants';

import {
  validatePathParameters,
  validatePostBody
} from '../commons/validation';

export default (app: Application) => {
  app.post('/metric/:key', (req: Request, res: Response ) => {
    try {
      const { key } = req.params;
      const { value } = req.body;

      if (
        !validatePathParameters(key) ||
        !validatePostBody(value)
      ) {
        res.status(HTTP_BAD_REQUEST).json({
          message: MALFORMED_REQUEST
        });
      }

      addMetric(key, value);
      console.log(`Metric [ ${key} - ${value} ] registered successfully!`);

      res.status(HTTP_SUCCESS).json({});
    } catch (error) {
      res.status(HTTP_INTERNAL_ERROR).json({
        message: error
      })
    }
  });

  app.get('/metric/:key/sum', (req: Request,res: Response ) => {
    try {
      const { key } = req.params;

      if (!validatePathParameters(key)) {
        res.status(HTTP_BAD_REQUEST).json({
          message: MALFORMED_REQUEST
        });
      }

      res.status(HTTP_SUCCESS).json({
        value: getSum(key)
      });
    } catch (error) {
      res.status(HTTP_INTERNAL_ERROR).json({
        message: error
      });
    }
  });
}