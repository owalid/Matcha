import { delPicture } from '../controllers/deleteInfosUsers';
import { Router } from 'express';
import { delAllHistory, delOneHistory } from '../controllers/historyManager';
import { notifDelete } from '../controllers/notificationManager';
import { deleteMatch } from '../controllers/likeManager';
import { deleteInterest, deleteAllInterest } from '../controllers/changeInfosUser';

export const deleteInfosRoutes = Router();

// params: idUsr, index
deleteInfosRoutes.post('/picture', async (req, res) => {
    await delPicture(req, res);
});

// params: idUsr
deleteInfosRoutes.post('/allhistory', async (req, res) => {
    await delAllHistory(req, res);
});

// params: idUsr, idUsrVisited
deleteInfosRoutes.post('/onehistory', async (req, res) => {
    await delOneHistory(req, res);
});

// params: idNotif
deleteInfosRoutes.post('/notification', async (req, res) => {
    await notifDelete(req, res);
});

// params: idMatch
deleteInfosRoutes.post('/match', async (req, res) => {
    await deleteMatch(req, res);
});

deleteInfosRoutes.post('/interest', async (req, res) => {
    await deleteInterest(req, res);
})

deleteInfosRoutes.post('/allInterest', async (req, res) => {
    await deleteAllInterest(req, res);
})
