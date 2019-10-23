import { newLike, newDislike, newUnlike } from '../controllers/likeManager';
import { Router } from 'express';
import { registerUser } from '../controllers/register';
import { authMiddleware } from '../middleware/authMiddleware';
import { block, unblock, report } from '../controllers/blockManager';
import { sendMsg, deleteMsg } from '../controllers/messageManager';
import { newVisit } from '../controllers/visitManager';
import { addHistory } from '../controllers/historyManager';
import { generateQrcode } from '../controllers/generateQr';
import { newNotif, notifView } from '../controllers/notificationManager';

export const userRouter = Router();

// params: age_max, age_min, bio, dateOfBirth, email, firstName, gender,
//          lastName, maxDistance, password, latitude, longitude, sexualOr
userRouter.post('/register', async (req, res) => {
    await registerUser(req, res);
});

// params: aucun
userRouter.get('/getqrcodefa/:idUsr', (authMiddleware), async (req, res) => {
    await generateQrcode(req, res);
});

//params: idUsrBlocked, idUsrBlock
userRouter.post('/block', (authMiddleware), async (req, res) => {
    await block(req, res);
});

//params: idUsrBlocked, idUsrBlock
userRouter.post('/unblock', (authMiddleware), async (req, res) => {
    await unblock(req, res);
});

//params: idUsrReport, idUsrReported
userRouter.post('/report', (authMiddleware), async (req, res) => {
    await report(req, res);
});

//params: idUsr, idMatch, content, date
userRouter.post('/newMessage', (authMiddleware), async (req, res) => {
    await sendMsg(req, res);
});

//params: idUsrLike, idUsrLiked
userRouter.post('/like', async (req, res) => {
    await newLike(req, res);
});

//params: idMsg
userRouter.post('/deleteMessage', (authMiddleware), async (req, res) => {
    await deleteMsg(req, res);
})

//params: idUsrLike, idUsrLiked
userRouter.post('/dislike', (authMiddleware), async (req, res) => {
    await newDislike(req, res);
});

//params: idUsr, idUsrLiked
userRouter.post('/unlike', (authMiddleware), async (req, res) => {
    await newUnlike(req, res);
});

//params: idUsrVisit, idUsrVisited
userRouter.post('/visit', (authMiddleware), async (req, res) => {
    await newVisit(req, res);
});

//params: idUsr, idUsrVisited
userRouter.post('/newHistory', (authMiddleware), async (req, res) => {
    await addHistory(req, res);
});

//params: idUsr, notification
userRouter.post('/notif', (authMiddleware), async (req, res) => {
    await newNotif(req, res);
});

//params: idUsr
userRouter.post('/viewNotif', (authMiddleware), async (req, res) => {
    await notifView(req, res);
});