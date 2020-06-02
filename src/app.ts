import express,{ Application,Request,Response } from 'express';
import "dotenv/config";
import bodyParser from 'body-parser';

const app : Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/',(req:Request,res : Response ) => {
  res.send('TS App is Running')
})

const PORT = process.env.PORT || 4000;

app.listen(PORT,() => {
    console.log(`server is running on PORT ${PORT}`)
})