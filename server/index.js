import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

// variables and config
dotenv.config();
const app = express();

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

// DB connection and server listening
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log(`Database Connected to ${process.env.DB_NAME}`);
    app.listen(process.env.PORT, () =>
      console.log(`Server running at port ${process.env.PORT}`)
    );
  })
  .catch((err) => console.log('Something went wrong', err));
