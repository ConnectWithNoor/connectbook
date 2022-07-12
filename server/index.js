import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

import AuthRoute from './route/AuthRoute.js'
import {ErrorHandler} from './middleware/errorHandler.js'

// variables and config
dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

// middleware;
app.use(
  express.json({
    limit: '30mb',
    extended: true,
  })
);

app.use(
  express.urlencoded({
    limit: '30mb',
    extended: true,
  })
);

// Routes
app.use('/api/auth', AuthRoute)

app.use(ErrorHandler)

// DB connection and server listening
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log(`Database Connected to ${process.env.DB_NAME}`);
    app.listen(port, () =>
      console.log(`Server running at port ${port}`)
    );
  })
  .catch((err) => console.log('Something went wrong', err));
