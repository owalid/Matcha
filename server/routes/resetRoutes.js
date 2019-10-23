import { Router } from 'express';
import { verifiedResetPasswordPhone, resetPasswordPhone, resetPasswd, verifiedCode } from '../controllers/resetPasswordPhone';
import { verifiedResetPasswordEmail, resetPasswordEmail } from '../controllers/resetPasswordEmail';

export const resetRouter = Router();

// params: email
resetRouter.post('/passwordEmail', async (req, res) => {
    await resetPasswordEmail(req, res);
});

// params: aucun
resetRouter.get('/passwordEmail/:hash/:idUsr', async (req, res) => {
    await verifiedResetPasswordEmail(req, res);
});

// params: number, idUsr
resetRouter.post('/passwordSms', async (req, res) => {
    await resetPasswordPhone(req, res);
});

//params: aucun
resetRouter.get('/passwordSms/:code/:idUsr', async (req, res) => {
    await verifiedResetPasswordPhone(req, res);
});

resetRouter.get('/verifCode/:code/:idUsr', async (req, res) => {
    await verifiedCode(req, res);
});

//params idUSr, passwd
resetRouter.post('/passwd', async (req, res) => {
    await resetPasswd(req, res);
});