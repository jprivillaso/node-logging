import express, {
  Application,
} from 'express';

import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import compression from 'compression';

import config from './config/config';
import MetricRoutes from './routes/metrics';

const app : Application = express();

// log all requests
app.use(morgan('combined'));

// support json and url encoded requests
app.use(bodyParser.urlencoded(config.bodyParser));
app.use(bodyParser.json(config.bodyParser));
app.use(bodyParser.raw(config.bodyParser));
app.use(compression());

// setup encrypted session cookies
app.use(cookieParser());
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// register routes
MetricRoutes(app);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server is running on PORT ${PORT}`);
})