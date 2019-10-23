import { veriftoken } from '../controllers/authentication';
import { getVerified } from '../models/user';

export const authMiddleware = (req, res, next) => {
   if (typeof req.headers.token === 'undefined' || req.headers.token === null) {
      res.status(500).json({ error: "error token" });
   } else {
      if (veriftoken(req.headers.token)){
         next();
      } else {
         res.status(500).json({err: "token expired"})
      }
   }
}