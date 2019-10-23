import { Router } from 'express';
import { oauthFb } from '../controllers/oauthFb';

export const facebookRouter = Router();

//  params: id, first_name, lastname, email, birthday, gender
facebookRouter.post('/oauth', async (req, res) => {
  return res.status(200);
  // await oauthFb(req, res);
})