import { emailExists, register } from "../models/user";
import { validEmail, validPasswd, validPhone } from "../utils/checker";
import { sendMail } from "../utils/sendMail";
import { verifParams } from "../utils/verifParams";
import crypto from 'crypto';
import bcrypt from 'bcrypt';

require('dotenv').config();

export const registerUser = async (req, res) => {
    if (verifParams(req.body, 9)) {
        const { bio, dateOfBirth, email, firstName, gender,
                    lastName, password, latitude, longitude } = req.body;
        const uid = Math.floor(Math.random() * (99999 - 10000) + 10000);
        const retEmail = await emailExists(email);
        if (retEmail === null) {
            return res.status(500).json({ message: "Error mail" })
        } else if (retEmail === true) {
            return res.status(500).json({ message: "The email is already exists" })
        }
        if (!validEmail(email)) {
            return res.status(500).json({ message: "Not good format for email" })
        }
        if (!validPasswd(password)) {
            return res.status(500).json({
                message: "The password must be \
                contain at least 1 \
                lowercase, 1 uppercase, 1 numeric character, \
                must be eight character longer" })
        }
        const hash = crypto.randomBytes(20).toString('hex');
        const hashedPassword = await bcrypt.hash(password, parseInt(process.env.SALT_ROUNDS));
        const userInfos = [
            bio, //0
            dateOfBirth, //1
            email, //2
            firstName, //3
            gender, //4
            hash, //5
            0, //6
            lastName,  //7
            hashedPassword, //8
            latitude, //9
            longitude, //10
            uid //11
        ];
        const err = await register(userInfos);
        if (err !== false) {
            const resMail = await sendMail(userInfos[2], "Matcha",
                `<h2>Hello ${userInfos[3]}</h2> <br/>
                <p>Click to the <a href=" http://localhost:8080/verif/mail/${err.id_users}/${hash}">link</a> for valid your mail address</p>`);
            if (resMail !== false) {
                return res.status(200).json({ message: "Registration Successful! Please valid your address mail" })
            } else {
                return res.status(500).json({ message: "Error mail" })
            }
        } else {
            return res.status(500).json({ message: "Error" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}