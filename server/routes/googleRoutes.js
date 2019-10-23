import { Router } from 'express';
import { oauthGoogle } from '../controllers/oauthGoogle';

export const googleRouter = Router();

//  params: id, first_name, lastname, email, birthday, gender
googleRouter.post('/oauth', async (req, res) => {
    await oauthGoogle(req, res);
})