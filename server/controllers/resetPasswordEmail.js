import { changeHash, checkerEmailVerified, emailExists } from "../models/user";
import { verifParams } from "../utils/verifParams";
import { sendMail } from "../utils/sendMail";

export const resetPasswordEmail = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const { email } = req.body;
        const code = Math.floor(Math.random() * (99999 - 10000) + 10000);
        const isExist = await emailExists(email);
        if (isExist === false)
            return res.status(200).json({message: "Unknown user"});
        const retChangeHash = await changeHash(isExist.id_users, code);
        if (retChangeHash !== false) {
            const resMail = await sendMail(email, "Matcha",
                `<h2>Coucou</h2> <br/>
            <p>Voici votre code:
            <h1>${code}</h1> `);
            if (resMail !== false) {
                return res.status(200).json({ message: "Email send", idUsr: isExist.id_users })
            } else {
                return res.status(200).json({ message: "Error sendMail" })
            }
        } else {
            return res.status(500).json({ message: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const verifiedResetPasswordEmail = async (req, res) => {
    if (verifParams(req.params, 2)) {
        const { hash, idUsr } = req.params;
        const retVerifiedEmail = await checkerEmailVerified(hash, idUsr)
        if (retVerifiedEmail !== true) {
            return res.redirect('/resetPassword');
        } else if (retVerifiedEmail !== false) {
            return res.status(200).json({ message: "Email not verified" });
        } else {
            return res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}