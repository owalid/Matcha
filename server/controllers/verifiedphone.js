import { sendSms } from "../utils/sendSms";
import { checkerSmsVerified, newPhoneNumber, checkerCode } from "../models/user";
import { verifParams } from "../utils/verifParams";

export const sendSmsVerif = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { number, idUsr } = req.body;
        const hash = Math.floor(Math.random() * (99999 - 10000) + 10000);
        await newPhoneNumber(idUsr, hash, number);
        const resSms = await sendSms(number, hash);
        if (resSms) {
            return res.status(200).json({ message: "Sms send", code: hash })
        } else {
            return res.status(200).json({ message: "Error sms" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const verifSmsCode = async (req, res) => {
    if (verifParams(req.params, 2)) {
        const { hash, idUsr } = req.params;
        if (await checkerCode(hash, idUsr) !== false) {
            return res.json({ message: "Verified" });
        } else {
            return res.status(500).json({ message: "Errror" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}