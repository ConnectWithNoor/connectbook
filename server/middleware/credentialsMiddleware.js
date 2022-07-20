import { ALLOWED_ORIGINS } from "../utils/constants.js"

export const credentialsMiddleware = (req, res, next) => {
    const origin = req.headers.origin;
     if (ALLOWED_ORIGINS.includes(origin)) {
      res.header('Access-Control-Allow-Credentials', true)
     }

     next()
}