import { checkerEmailVerified, changeVerified } from "../models/user";
import { verifParams } from "../utils/verifParams";

export const verifiedMail = async (req, res) => {
    if (verifParams(req.params, 2)) {
        const { hash, idUsr } = req.params;
        const retVerifiedEmail = await checkerEmailVerified(hash, idUsr);
        if (retVerifiedEmail === true) {
            changeVerified(idUsr);
            return res.status(200).json({ message: "OK" });
        } else if (retVerifiedEmail === false) {
            return res.status(200).json({ message: "NOT OK" });
        } else {
            return res.status(500).json({ message: "err" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}
