import { verifParams } from "../utils/verifParams";
import { changeHashSms, checkerSmsVerified, phoneExists, changePassword, checkerCode } from "../models/user";
import { sendSms } from "../utils/sendSms";
import bcrypt from 'bcrypt';
require('dotenv').config();


export const resetPasswordPhone = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const { number } = req.body;
        const code = Math.floor(Math.random() * (99999 - 10000) + 10000);
        const userInfos = await phoneExists(number);
        if (userInfos === false)
        return res.status(500).json({ message: "Unknown phone" })
        await changeHashSms(userInfos.id_users, code);
        const resSms = sendSms(number, code);
        if (resSms) {
            return res.status(200).json({ message: "Sms send", idUsr: userInfos.id_users })
        } else {
            return res.status(500).json({ message: "Error sms" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const verifiedCode = async (req, res) => {
    if (verifParams(req.params, 2)) {
        const { code, idUsr } = req.params;
        if (await checkerCode(code, idUsr)) {
            return res.status(200).json({ message: "OK" });
        } else {
            return res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const resetPasswd = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const {idUsr, passwd} = req.body;
        let pass = await bcrypt.hash(passwd, parseInt(process.env.SALT_ROUNDS));
        const changePswd = await changePassword(idUsr, pass);
        if (changePswd !== false) {
            return res.status(200).json({ message: "OK" });
        } else {
            return res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(500).json({error: "Error params"});
    }
}