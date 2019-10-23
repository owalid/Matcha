import { getUsersFilter, getInfosUser } from "../controllers/getUsers";
import { Router } from 'express';
import { allvisits } from "../controllers/visitManager";
import { history } from "../controllers/historyManager";
import { message, allMessage, oneMessage } from "../controllers/messageManager";
import { getAllAchievement, getUsersAchievement, getOneAchievement } from "../controllers/getAchievement";
import { getAllInterest, getUserInterest } from "../controllers/interestManager";
import { getIpAddress, getCoordinatePlace } from "../controllers/getIp";
import { getSementicBio } from "../controllers/getSementicsBio";
import { getAllMatchUser } from "../controllers/getAllMatch";
import { getMid } from "../controllers/getMid";
import { getNotif } from "../controllers/notificationManager";
import { authMiddleware } from "../middleware/authMiddleware";
import { getInterestsUser } from "../models/interest";

export const getterRoutes = Router();

//params: aucun
getterRoutes.get('/allUsers/:id', (authMiddleware), async (req, res) => {
    await getUsersFilter(req, res);
});

//params: aucun
getterRoutes.get('/visit/:id', (authMiddleware), async (req, res) => {
    await allvisits(req, res);
});

//params: aucun
getterRoutes.get('/history/:id', (authMiddleware), async (req, res) => {
    await history(req, res);
});

//params: aucun
getterRoutes.get('/message/:id', (authMiddleware), async (req, res) => {
    await message(req, res);
})

//params: aucun
getterRoutes.get('/oneMessage/:idMsg', (authMiddleware), async (req, res) => {
    await oneMessage(req, res);
})

getterRoutes.get('/allMessages/:id', (authMiddleware), async (req, res) => {
    await allMessage(req, res);
})

//params: aucun
getterRoutes.get('/allMatch/:id', (authMiddleware), async (req, res) => {
    await getAllMatchUser(req, res);
})

//params: aucun
getterRoutes.get('/allAchievement', (authMiddleware), async (req, res) => {
    await getAllAchievement(req, res);
})

//params: aucun
getterRoutes.get('/oneAchievement/:id', (authMiddleware), async (req, res) => {
    await getOneAchievement(req, res);
});

//params: aucun
getterRoutes.get('/allInterests', (authMiddleware), async (req, res) => {
    await getAllInterest(req, res);
})

//params: aucun
getterRoutes.get('/interestUser/:idUsr', (authMiddleware), async (req, res) => {
    await getUserInterest(req, res);
})

//params: aucun
getterRoutes.get('/getUserAchievement/:id', (authMiddleware), async (req, res) => {
    await getUsersAchievement(req, res);
})

//params: aucun
getterRoutes.get('/location', async (req, res) => {
    await getIpAddress(req, res);
})

//params: aucun
getterRoutes.get('/:idUser', (authMiddleware), async (req, res) => {
    await getInfosUser(req, res);
});

//params: aucun
getterRoutes.get('/sementic/:idUser', (authMiddleware), async (req, res) => {
    await getSementicBio(req, res);
});

getterRoutes.get('/mid/:idMatch', (authMiddleware), async (req, res) => {
    await getMid(req, res);
})

getterRoutes.get('/notif/:idUsr', (authMiddleware), async (req, res) => {
    await getNotif(req, res);
})

getterRoutes.get('/coordinate/:place', async (req, res) => {
    await getCoordinatePlace(req, res);
})

