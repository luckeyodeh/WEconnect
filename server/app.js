import express from 'express';
import path from 'path';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import index from './routes/index';


const app = express();


app.use(cors({ credentials: true, origin: true }));


const port = process.env.PORT || '8000';
app.set('port', port);

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.status(200).send('Welcome to life again');
});
/**
 * Listen on provided port
 */
app.listen(port);

export default app;
