import { verifParams } from "../utils/verifParams"
import { getUser } from "../models/user";

const speakeasy = require('speakeasy');

export const verifCodeFa = async (req, res) => {
    if (verifParams(req.params, 2)) {
        const {code, idUsr} = req.params;
        const user = await getUser(idUsr);
        if (user === false)
            return res.status(500).json({error: "Unkown idUsr"});
        const totp = speakeasy.totp({
            secret: user.secretfa,
            encoding: "base32"
        });
       
        if (code == totp) {
            return res.status(200).json({msg: "OK"});
        } else {
            return res.status(200).json({msg: "BAD CODE"});
        }
    } else {
        return res.status(500).json({error: "error params"});
    }
}