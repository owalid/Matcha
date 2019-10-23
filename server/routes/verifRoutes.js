import { Router } from 'express';
import { verifiedMail } from '../controllers/verifiedMail';
import { sendSmsVerif, verifSmsCode } from '../controllers/verifiedphone';
import { verifCodeFa } from '../controllers/verifcodeFa';

export const verifRouter = Router();

// params: aucun
verifRouter.get('/mail/:idUsr/:hash', async (req, res) => {
    await verifiedMail(req, res);
});

// params: number, idUsr
verifRouter.post('/sms', async (req, res) => {
    await sendSmsVerif(req, res);
});

verifRouter.get('/sms/:idUsr/:hash', async (req, res) => {
    await verifSmsCode(req, res);
});

verifRouter.get('/fa/:idUsr/:code/', async (req, res) => {
    await verifCodeFa(req, res);
});