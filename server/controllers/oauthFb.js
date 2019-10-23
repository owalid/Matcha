import { getUserGoogle, newUserFb, getUserFb } from "../models/user"
import { tokenforOAuth } from "./authentication";
import { getInterestsUser } from "../models/interest";

export const oauthFb = async (req, res) => {
    const { id, first_name, last_name, email, birthday, gender } = req.body;
    const fbUsr = await getUserFb(id);
    if (!fbUsr || fbUsr.length === 0) {
        const uid = Math.floor(Math.random() * (99999 - 10000) + 10000);
        let newUsr = await newUserFb(id, first_name, last_name, email, birthday, gender, uid);
        let token = tokenforOAuth(req.body);
        let arrayEmpty = [];
        return res.status(200).json({token: token, user: newUsr, interest: arrayEmpty});
    } else {
        let token = tokenforOAuth(fbUsr);
        let interest = await getInterestsUser(fbUsr.id_users);
        return res.status(200).json({token: token,user: fbUsr, interest: interest});
    }
}