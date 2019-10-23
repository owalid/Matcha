import { getUserFb, newUserFb } from "../models/user";
import { tokenforOAuth } from "./authentication";

export const oauthGoogle = async (req, res) => {
    const { id, first_name, lastname, email, birthday, gender } = req.body;
    const fbUser = await getUserFb(id);
    if (fbUser && fbUser.length === 0) {
        await newUserFb(id, first_name, lastname, email, birthday, gender);
        let token = tokenforOAuth(profile);
        req.session.token = token;
      } else {
        let token = tokenforOAuth(profile);
        req.session.token = token;
        //redirect home
      }
}