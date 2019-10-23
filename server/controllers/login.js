import { verifParams } from '../utils/verifParams';
import { tokenForUser } from './authentication';
import { emailExists, phoneExists, switchToLogged } from '../models/user';
import bcrypt from 'bcrypt';
import { getInterestsUser } from '../models/interest';

const speakeasy = require('speakeasy');

export const loginUser = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { email, password } = req.body;
        const userInfos = await emailExists(email);
        if (userInfos === null || userInfos === undefined) {
            return res.status(200).json({ error: "user" })
        }
        const ret = await switchToLogged(userInfos.id_users);
        if (ret === false) {
            return res.status(500).json({ error: "Error log" });
        }
        const match = await bcrypt.compare(password, userInfos.password);
        if (match === true) {
            let token = await tokenForUser(userInfos);
            let interest = await getInterestsUser(userInfos.id_users);            
            return res.status(200).json({ token: token, user: userInfos, interest: interest });
        } else {
            return res.status(200).json({ error: "password" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const loginDoubleFaMail = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { code, password, email } = req.body;
        const userInfos = await emailExists(email);
        if (userInfos === false)
            return res.status(500).json({ message: "Unknown email" })
        const totp = speakeasy.totp({
            secret: userInfos.secretfa,
            encoding: "base32"
        });
        const ret = await switchToLogged(userInfos.id_users);
        if (ret === false) {
            return res.status(500).json({ error: "Error log" });
        }
        const match = await bcrypt.compare(password, userInfos.password);
        if (match === true) {
            if (code !== totp) {
                return res.status(200).json({ message: "not good code fa" });
            }
            let token = tokenForUser(userInfos);
            let interest = await getInterestsUser(userInfos.id_users);
            return res.status(200).json({token: token,user: userInfos, interest: interest});
        } else {
            return res.status(200).json({ message: "Incorrect password" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const loginDoubleFaPhone = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { code, password, phone } = req.body;
        const userInfos = await phoneExists(phone);
        if (userInfos === false)
            return res.status(200).json({ message: "Unknown phone" })
        const totp = speakeasy.totp({
            secret: userInfos.secretfa,
            encoding: "base32"
        });
        const ret = await switchToLogged(userInfos.id_users);
        if (ret === false) {
            return res.status(500).json({ error: "Error log" });
        }
        const match = await bcrypt.compare(password, userInfos.password);
        if (match === true) {
            if (code !== totp) {
                return res.status(200).json({ message: "not good code fa" });
            }
            let token = tokenForUser(userInfos);
            return res.status(200).json(token);
        } else {
            return res.status(500).json({ message: "Incorrect password" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const loginSmsUser = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { password, phone } = req.body;
        const userInfos = await phoneExists(phone);
        if (userInfos === false) {
            return res.status(200).json({ error: "Phone" })
        }
        const ret = await switchToLogged(userInfos.id_users);
        if (ret === false) {
            return res.status(500).json({ error: "Error log" });
        }
        const match = await bcrypt.compare(password, userInfos.password);
        if (match === true) {
            let token = await tokenForUser(userInfos);
            return res.status(200).json({ token: token, user: userInfos });
        } else {
            return res.status(200).json({ error: "password" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}