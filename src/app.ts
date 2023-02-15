import createError,{HttpError} from 'http-errors';
import express,{Request, Response} from 'express';
import path from 'path';
import cookieParser from'cookie-parser';
import logger from 'morgan';
import dotenv from "dotenv";
import indexRouter from './routes/index';

import { dbConnect } from './config/testdb';
import connectDB from './config/db';

dotenv.config();

//= ======== DB Connect ===========
if (process.env.NODE_ENV === "test") {
  dbConnect();
} else {
  connectDB();
}


const app = express();


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  res.redirect('/api');
});

app.use('/api', indexRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use((err:HttpError, req:Request, res:Response)=> {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
