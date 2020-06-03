import express, {
  Application,
  Request,
  Response
} from 'express';
import bodyParser from 'body-parser';
import { addMetric, getSum } from './services/aggreator';

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/metric/:key', (req: Request,res: Response ) => {
  const { key } = req.params;
  addMetric(key);
  res.send(`received key ${key}`);
});

console.log('new str');

app.get('/metric/:key/sum', (req: Request,res: Response ) => {
  const { key } = req.params;
  res.send(`the sum for the key ${key} is ${getSum()}`);
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
})