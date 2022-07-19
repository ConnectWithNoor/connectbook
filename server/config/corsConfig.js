const ALLOWED_ORIGINS = ['http://localhost:3000'];

const corsConfig = {
  origin: (origin, callback) => {
    if (ALLOWED_ORIGINS.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsConfig;
