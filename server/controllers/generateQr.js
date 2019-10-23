import { newSecretFa } from '../models/user';
import { verifParams } from '../utils/verifParams';

const Qrcode = require('qrcode');
const speakeasy = require('speakeasy');

export const generateQrcode = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { idUsr } = req.params;
        let secret = speakeasy.generateSecret();
        Qrcode.toDataURL(secret.otpauth_url, async (err, data_url) => {
            if (err) {
                res.status(500).json({ error: `error ${err}` });
            } else {
                if (await newSecretFa(idUsr, secret.base32, data_url) !== false) {
                    return res.status(200).json({ data_img: data_url, secret: secret.otpauth_url });
                } else {
                    return res.status(500).json({ error: "error" });
                }
            }
        });
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}