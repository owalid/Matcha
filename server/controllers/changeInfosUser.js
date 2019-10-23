import { validPasswd } from "../utils/checker";
import { changePassword, changeMaxdistance, changeEmail, changeBio, changeSexualOr, changeMaxage, changeMinage, goodPassword, changePicture, changePlacePicture, changeFa, getUser, changeFirstName, changeLastName, changeGender, changeDateOfBirth, changeCoordinate, changetagCommon } from "../models/user";
import { verifParams } from "../utils/verifParams";
import bcrypt from 'bcrypt';
import crypto from 'crypto';
import { sendMail } from "../utils/sendMail";
import { getInterestsUser, setInterest, delInterest, delAllInterest } from "../models/interest";
require('dotenv').config();

export const changePasswdUser = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { oldpasswd, newpasswd, idUsr } = req.body;
        const user = await getUser(idUsr);
        if (user === false) {
            return res.status(500).json({ error: "error" });
        } else {
            const match = await bcrypt.compare(oldpasswd, user.password);
            if (match === true) {
                if (!validPasswd(newpasswd)) {
                    return res.status(200).json({
                        message: "Passwd format"
                    })
                }
                let passwd = await bcrypt.hash(newpasswd, parseInt(process.env.SALT_ROUNDS));
                const ret = await changePassword(idUsr, passwd);
                if (ret !== false) {
                    return res.status(200).json({ message: "Password changed" })
                } else {
                    return res.status(500).json({ error: "Error" })
                }
            }
            else {
                return res.status(200).json({ message: "passwd" })
            }
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const distanceMax = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { maxDistance, idUsr } = req.body;
        const ret = await changeMaxdistance(maxDistance, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const mail = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { email, idUsr, firstName } = req.body;
        const ret = await changeEmail(email, idUsr);
        if (ret !== false) {
            const hash = crypto.randomBytes(20).toString('hex');
            const retMail = await sendMail(email, "Matcha",
                `<h2>Hello ${firstName}</h2> <br/> \
            <p>Click to the <a href="http://localhost:3000/verif/mail/${idUsr}/${hash}">link</a> for valid your mail address </p>`);
            if (retMail !== false) {
                return res.status(200).json({ message: "Information changed" })
            } else {
                return res.status(500).json({ message: "Error mail" })
            }
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const bio = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { bio, idUsr } = req.body;
        const ret = await changeBio(bio, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const sexualOr = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { sexualOr, idUsr } = req.body;
        const ret = await changeSexualOr(sexualOr, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const maxAge = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { ageMax, idUsr } = req.body;
        const ret = await changeMaxage(ageMax, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const minAge = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { ageMin, idUsr } = req.body;
        const ret = await changeMinage(ageMin, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}
export const firstName = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { firstName, idUsr } = req.body;
        const ret = await changeFirstName(firstName, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}
export const lastName = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { lastName, idUsr } = req.body;
        const ret = await changeLastName(lastName, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" })
        } else {
            return res.status(500).json({ error: "Error sql" })
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const picture = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { idUsr, index, picture } = req.body;
        const ret = await changePicture(idUsr, index, picture);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const tagCommon = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, tagCommon } = req.body;
        const ret = await changetagCommon(tagCommon, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const placePicture = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { idUsr, oldIndex, newIndex } = req.body;
        const ret = await changePlacePicture(idUsr, oldIndex, newIndex);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const fa = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, value } = req.body;
        const ret = await changeFa(idUsr, value);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const gender = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, gender } = req.body;
        const ret = await changeGender(idUsr, gender);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const dateOfBirth = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, date } = req.body;
        const ret = await changeDateOfBirth(date, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const coordinate = async (req, res) => {
    if (verifParams(req.body, 3)) {
        const { idUsr, lat, lgn } = req.body;
        const ret = await changeCoordinate(lat, lgn, idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "Information changed" });
        } else {
            return res.status(500).json({ error: "Error sql" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const interest = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, idInterest } = req.body;
        const interestUser = await getInterestsUser(idUsr);
        const isExists = interestUser.findIndex(elmt => elmt.id_interest == idInterest);
        if (isExists > -1) {
            return res.status(200);
        } else {
            const ret = await setInterest(idInterest, idUsr);
            if (ret !== false) {
                return res.status(200).json({ message: "Information changed", interest: ret });
            } else {
                return res.status(500).json({ error: "Error sql" });
            }
        }
        } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const deleteInterest = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const {idUsr, idInterest} = req.body;
        const ret = await delInterest(idInterest, idUsr);
        if (ret !== false) {
            return res.status(200).json({message: "information changed"});
        } else {
            return res.status(500).json({error: "ERR sql"});
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}


export const deleteAllInterest = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const {idUsr} = req.body;
        const ret = await delAllInterest(idUsr);
        if (ret !== false) {
            return res.status(200).json({message: "information changed"});
        } else {
            return res.status(500).json({error: "ERR sql"});
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}