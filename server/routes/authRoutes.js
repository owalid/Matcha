import { Router } from 'express';
import { logout } from '../controllers/logout';
import { loginSmsUser, loginUser, loginDoubleFaMail, loginDoubleFaPhone } from '../controllers/login';
import { authMiddleware } from '../middleware/authMiddleware';
import { oauthFb } from '../controllers/oauthFb';
const request = require('request');
require('dotenv').config();



export const authRouter = Router();

// params: code, password, email
authRouter.post('/loginFaEmail', async (req, res) => {
    await loginDoubleFaMail(req, res);
});

// params: code, password, phone
authRouter.post('/loginFaPhone', async (req, res) => {
    await loginDoubleFaPhone(req, res);
});

// params: email, password
authRouter.post('/loginMail', async (req, res) => {
    await loginUser(req, res);
});

// params: phone, password
authRouter.post('/loginSms', async (req, res) => {
    await loginSmsUser(req, res);
});

//params: aucun
authRouter.post('/logout', (authMiddleware), async (req, res) => {
    await logout(req, res);
});

authRouter.post('/fb', async (req, res) => {
    await oauthFb(req, res);
  })