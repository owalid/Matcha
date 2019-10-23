import { client } from '../connection';

export const getUser = async (id) => {
    const sql = "SELECT * FROM users WHERE id_users = $1";
    try {
        const res = await client.query(sql, [id])
        return res.rows[0];
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getUserFb = async (id) => {
    const sql = "SELECT * FROM facebook_users, users WHERE profil_id = $1 AND users.id_users = facebook_users.id_users";
    try {
        const res = await client.query(sql, [id]);
        return res.rows[0];
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getUserGoogle = async (id) => {
    const sql = "SELECT * FROM google_users WHERE profil_id = $1";
    try {
        const res = await client.query(sql, [id]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getBio = async (id) => {
    const sql = "SELECT bio FROM users WHERE id_users = $1";
    try {
        const res = await client.query(sql, [id]);
        return res.rows[0].bio;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getNotifUser = async (id) => {
    const sql = "SELECT * FROM notification WHERE id_users = $1";
    try {
        const res = await client.query(sql, [id]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getPicture = async (idUsr) => {
    const sql = "SELECT picture FROM users WHERE id_users = $1";
    try {
        const res = await client.query(sql, [idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const deletePicture = async (idUsr, picture) => {
    const sql = "SELECT * FROM picture_remove($1, $2)"
    try {
        const res = await client.query(sql, [idUsr, picture]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const newUserFb = async (id, firstName, lastname, email, dateOfBirth, gender, uid) => {
    let sql = "INSERT INTO users(first_name, last_name, email, is_verified, date_of_birth, gender, uid)\
    VALUES($1, $2, $3, $4, $5, $6, $7)\
    RETURNING *";
    try {
        let resUsr = await client.query(sql, [firstName, lastname, email, 1, dateOfBirth, gender, uid]);
        if (resUsr.rows) {
            let idUsr = resUsr.rows[0].id_users;
            sql = "INSERT INTO facebook_users(profil_id, id_users) \
                                        VALUES($1, $2) \
                                        RETURNING *";
            try {
                let res = await client.query(sql, [id, idUsr]);
                if (res.rows)
                    return resUsr.rows[0];
            } catch (e) {
                console.error(e.stack);
                return false;
            }
        }
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const newUserGoogle = async (id, firstName, lastname, email, dateOfBirth, gender) => {
    let sql = "INSERT INTO users(first_name, last_name, email, is_verified, date_of_birth, gender)\
                VALUES($1, $2, $3, $4, $5, $6)\
                RETURNING *";

    try {
        let res = await client.query(sql, [firstName, lastname, email, 1, dateOfBirth, gender]);
        if (res.rows) {
            let idUsr = res.rows[0].id_users;
            sql = "INSERT INTO google_users(profil_id, id_users) \
                                        VALUES($1, $2) \
                                        RETURNING *";
            try {
                res = await client.query(sql, [id, idUsr]);
                if (res.rows)
                    return res.rows;
            } catch (e) {
                console.error(e.stack);
                return false;
            }
        }
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getAllUsers = async (sexualOr, gender, id) => {
    let sql = '';
    if (sexualOr == 'G') {
        sql = "SELECT * FROM users WHERE gender = $1 AND (sexual_or = $2 OR sexual_or = 'B')";
    } else if (sexualOr == 'B') {
        sql = "SELECT * FROM users";
    } else if (sexualOr == 'H') {
        sql = "SELECT * FROM users WHERE (sexual_or = $2 OR sexual_or = 'B') AND gender != $1";
    }
    try {
        let res;
        if (sexualOr == 'B') {
            sql += ' WHERE users.id_users != $1';
            res = await client.query(sql, [id])
        }
        else {
            sql += ' AND users.id_users != $3';
            res = await client.query(sql, [gender, sexualOr, id])
        }
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const switchToLogged = async (idUsers) => {
    let sql = "UPDATE users \
                SET is_logged = true \
                WHERE id_users = $1 \
                RETURNING *";
    try {
        const res = await client.query(sql, [idUsers]);
        return (res.rows) ? true : false;
    } catch (error) {
        console.error(e.stack);
    }
}

export const switchToLogout = async (idUsers, date) => {
    let sql = "UPDATE users \
                SET is_logged = false, \
                last_log = $2\
                WHERE id_users = $1 \
                RETURNING *";
    try {
        const res = await client.query(sql, [idUsers, date]);
        return (res.rows) ? true : false;
    } catch (error) {
        console.error(e.stack);
    }
}

export const checkerEmailVerified = async (hash, idUsr) => {
    const sql = "SELECT * FROM users WHERE hash = $1 AND id_users = $2";
    try {
        const res = await client.query(sql, [hash, idUsr]);
        return (res.rows) ? true : false;
    } catch (e) {
        console.error(e.stack);
        return null;
    }
}

export const isVerifiedSms = async (idUsr) => {
    const sql = "UPDATE users \
                SET is_verified_phone = '1' \
                WHERE id_users = $1 \
                RETURNING *";
    try {
        const res = await client.query(sql, [idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const checkerCode = async (hash, idUsr) => {
    const sql = "SELECT * FROM users WHERE code = $1 AND id_users = $2";
    try {
        const res = await client.query(sql, [hash, idUsr]);
        if (res.rows) {
            if (await isVerifiedSms(idUsr) !== false)
                return (res.rows);
            else {
                return false;
            }
        } else {
            return false;
        }
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}
export const newPhoneNumber = async (idUsr, hash, phoneNumber) => {
    const sql = "UPDATE users \
                SET code = $1, \
                is_verified_phone = '0', \
                phone_number = $3 \
                WHERE id_users = $2 \
                RETURNING *";
    try {
        const res = await client.query(sql, [hash, idUsr, phoneNumber]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeHashSms = async (idUsr, hash) => {
    const sql = "UPDATE users \
                SET code = $1 \
                WHERE id_users = $2 \
                RETURNING *";
    try {
        const res = await client.query(sql, [hash, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const newSecretFa = async (idUsr, base32, qr) => {
    const sql = "UPDATE users \
                SET secretfa = $1,\
                qrcodefa = $2,\
                fa = true\
                WHERE id_users = $3\
                RETURNING *";
    try {
        const res = await client.query(sql, [base32, qr, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getSecret = async (idUsr) => {
    const sql = "SELECT secretfa FROM users WHERE id_users = $1";
    try {
        const res = await client.query(sql, [idUsr]);
        if (res.rows) {
            return (res.rows[0]);
        } else {
            return null;
        }
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getVerified = async (idIUsr) => {
    const sql = 'SELECT is_verified FROM USERS WHERE id_users = $1';
    try {
        const res = await client.query(sql, [idIUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const emailExists = async (email) => {
    const sql = "SELECT * FROM users WHERE email = $1";
    try {
        const res = await client.query(sql, [email]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return null;
    }
}

export const phoneExists = async (phone) => {
    const sql = "SELECT * FROM users WHERE phone_number = $1";
    try {
        const res = await client.query(sql, [phone]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return null;
    }
}

export const register = async (userInfos) => {
    const sql = "INSERT INTO users(bio, date_of_birth, email, \
        first_name, gender, hash, is_verified, last_name, \
         password, latitude, longitude, uid) \
        VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)\
        RETURNING *";
    try {
        const res = await client.query(sql, userInfos);
        return res.rows[0];
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}


export const goodPassword = async (userId, password) => {
    const sql = "SELECT * \
                FROM users \
                WHERE id_users = $1\
                AND password = $2"
    try {
        let result = await client.query(sql, [userId, password]);
        if (result) {
            return true;
        } else {
            return false;
        }
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

// ------------change infos------------ //
export const changePassword = async (userId, password) => {
    const sql = "UPDATE users \
            SET password = $1 \
            WHERE id_users = $2\
            RETURNING *";
    try {
        await client.query(sql, [password, userId]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeVerified = async (idUsr) => {
    const sql = "UPDATE users\
                SET is_verified = '1'\
                WHERE id_users = $1\
                RETURNING *";
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeHash = async (userId, hash) => {
    const sql = "UPDATE users \
                SET code = $1 \
                WHERE id_users = $2 \
                RETURNING *";
    try {
        const res = await client.query(sql, [hash, userId]);
        return res.rows[0];
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changetagCommon = async (tagCommon, idUsr) => {
    const sql = "UPDATE users \
                SET tag_common = $1 \
                WHERE id_users = $2 \
                RETURNING *";
    try {
        const res = await client.query(sql, [tagCommon, idUsr]);
        return res.rows[0];
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeFa = async (idUsr, value) => {
    const sql = "UPDATE users \
                SET fa = $1\
                WHERE id_users = $2\
                RETURNING *";
    try {
        const res = await client.query(sql, [value, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeGender = async (idUsr, gender) => {
    const sql = "UPDATE users \
                SET gender = $1\
                WHERE id_users = $2\
                RETURNING *";
    try {
        const res = await client.query(sql, [gender, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changePhone = async (idUsr, phone) => {
    const sql = "UPDATE users \
                SET phone_number = $1\
                WHERE id_users = $2\
                RETURNING *";
    try {
        const res = await client.query(sql, [phone, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeInformations = async (userInfos) => {
    const sql = "UPDATE users \
                SET age_max = $1, \
                    age_min = $2, \
                    bio = $3, \
                    date_of_birth = $4, \
                    email = $5, \
                    first_name = $6, \
                    last_name = $7, \
                    login = $8, \
                    max_distance = $9, \
                    password = $10, \
                    plus_code = $11, \
                    sexual_or = $12 \
                WHERE id_user = $13\
                RETURNING *";
    try {
        await client.query(sql, userInfos);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeMaxdistance = async (maxDistance, idUsr) => {
    const sql = "UPDATE users \
                SET max_distance = $1\
                WHERE id_users = $2\
                RETURNING *";
    const value = [maxDistance, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeDateOfBirth = async (date, idUsr) => {
    const sql = "UPDATE users \
                SET date_of_birth = $1\
                WHERE id_users = $2\
                RETURNING *";
    const value = [date, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeCoordinate = async (lat, lgn, idUsr) => {
    const sql = "UPDATE users \
                SET latitude = $1,\
                longitude = $2\
                WHERE id_users = $3\
                RETURNING *";
    try {
        await client.query(sql, [lat, lgn, idUsr]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeEmail = async (email, idUsr) => {
    const sql = "UPDATE users \
                SET email = $1,\
                is_verified = false\
                WHERE id_users = $2\
                RETURNING *";
    const value = [email, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeBio = async (bio, idUsr) => {
    const sql = "UPDATE users \
                SET bio = $1\
                WHERE id_users = $2\
                RETURNING *";
    const value = [bio, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeSexualOr = async (sexualOr, idUsr) => {
    const sql = "UPDATE users \
                SET sexual_or = $1\
                WHERE id_users = $2\
                RETURNING *";
    const value = [sexualOr, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeMaxage = async (ageMax, idUsr) => {
    const sql = "UPDATE users \
                SET age_max = $1\
                WHERE id_users = $2\
                RETURNING *";
    try {
        await client.query(sql, [ageMax, idUsr]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeMinage = async (ageMin, idUsr) => {
    const sql = "UPDATE users \
                SET age_max = $1\
                WHERE id_users = $2\
                RETURNING *";
    const value = [ageMin, idUsr];
    try {
        await client.query(sql, value);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changePicture = async (idUsr, index, picture) => {
    const sql = "UPDATE users\
                SET picture[$1] = $2\
                WHERE id_users = $3";
    try {
        const res = await client.query(sql, [index, picture, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false
    }
}

export const changePlacePicture = async (idUsr, oldIndex, newIndex) => {
    const sql = "UPDATE users\
                SET picture[$1] = picture[$2],\
                    picture[$2] = picture[$1]\
                    WHERE id_users = $3";
    try {
        const res = await client.query(sql, [oldIndex, newIndex, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeSementicBio = async (idUsr, sementic) => {
    const sql = "UPDATE users \
                SET sementics_bio = $1 \
                WHERE id_users = $2";
    try {
        const res = await client.query(sql, [sementic, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeFirstName = async (idUsr, firstName) => {
    const sql = "UPDATE users \
                SET first_name = $1 WHERE id_users = $2";
    try {
        const res = await client.query(sql, [firstName, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const changeLastName = async (idUsr, lastName) => {
    const sql = "UPDATE users \
                SET last_name = $1 WHERE id_users = $2";
    try {
        const res = await client.query(sql, [lastName, idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}
