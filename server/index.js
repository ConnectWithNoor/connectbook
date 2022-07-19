import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import AuthRoute from './route/AuthRoute.js';
import UserRoute from './route/UserRoute.js';
import PostRoute from './route/PostRoute.js';
import MediaRoute from './route/MediaRoute.js';
import { ErrorHandler } from './middleware/errorHandler.js';

import corsConfig from './config/corsConfig.js';

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

app.use(cors(corsConfig));

app.use(cookieParser());

// middleware to server images
app.use(express.static('public'));
app.use('/images', express.static('images'));

// Routes
app.use('/api/auth', AuthRoute);
app.use('/api/user', UserRoute);
app.use('/api/post', PostRoute);
app.use('/api/media', MediaRoute);

app.use(ErrorHandler);

// DB connection and server listening
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log(`Database Connected to ${process.env.DB_NAME}`);
    app.listen(port, () => console.log(`Server running at port ${port}`));
  })
  .catch((err) => console.log('Something went wrong', err));
