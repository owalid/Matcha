import { changePasswdUser, distanceMax, mail, bio, sexualOr, maxAge, minAge, picture, placePicture, fa, firstName, lastName, gender, dateOfBirth, coordinate, tagCommon, interest } from '../controllers/changeInfosUser';
import { Router } from 'express';

export const updateInfosRoutes = Router();

// params: oldpasswd, newpasswd, idUsr
updateInfosRoutes.post('/password', async (req, res) => {
    await changePasswdUser(req, res);
})

// params: idUsr, value
updateInfosRoutes.post('/fa', async (req, res) => {
    await fa(req, res);
})

// params: maxDistance, idUsr
updateInfosRoutes.post('/distance', async (req, res) => {
    await distanceMax(req, res);
})

// params: email, idUsr, firstName
updateInfosRoutes.post('/mail', async (req, res) => {
    await mail(req, res);
})

// params: idUsr, firstName
updateInfosRoutes.post('/firstname', async (req, res) => {
    await firstName(req, res);
})

// params: idUsr, lastName
updateInfosRoutes.post('/lastname', async (req, res) => {
    await lastName(req, res);
})

// params: bio, idUsr
updateInfosRoutes.post('/bio', async (req, res) => {
    await bio(req, res);
})

// params: sexualOr, idUsr
updateInfosRoutes.post('/sexualOr', async (req, res) => {
    await sexualOr(req, res);
})

// params: sexualOr, idUsr
updateInfosRoutes.post('/gender', async (req, res) => {
    await gender(req, res);
})

// params: ageMax, idUsr 
updateInfosRoutes.post('/maxAge', async (req, res) => {
    await maxAge(req, res);
})

// params: ageMin, idUsr
updateInfosRoutes.post('/minAge', async (req, res) => {
    await minAge(req, res);
})

// params: idUsr, index, picture
updateInfosRoutes.post('/picture', async (req, res) => {
    await picture(req, res);
})

// params: idUsr, date
updateInfosRoutes.post('/dateOfBirth', async (req, res) => {
    await dateOfBirth(req, res);
})

// params: idUsr, lat, lgn
updateInfosRoutes.post('/coordinate', async (req, res) => {
    await coordinate(req, res);
})

// params: oldIndex, newIndex, idUsr
updateInfosRoutes.post('/placePicture', async (req, res) => {
    await placePicture(req, res);
})

// idInterest, idUsr:
updateInfosRoutes.post('/interest', async (req, res) => {
    await interest(req, res);
})

// params: tagCommon, idUsr
updateInfosRoutes.post('/tagCommon', async (req, res) => {
    await tagCommon(req, res);
})