import {
  Application,
  Request,
  Response
} from 'express';
import { addMetric, getSum } from '../services/aggreator';

export default (app: Application) => {
  app.post('/metric/:key', (req: Request,res: Response ) => {
    const { key } = req.params;
    addMetric(key);
    res.send(`received key ${key}`);
  });

  app.get('/metric/:key/sum', (req: Request,res: Response ) => {
    const { key } = req.params;
    res.send(`the sum for the key ${key} is ${getSum()}`);
  });
}