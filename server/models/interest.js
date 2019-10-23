import { client } from '../connection';

export const getInterest = async (idUsr) => {
    let sql = 'SELECT id_interest FROM users_interest\
                        WHERE id_users = $1';
    try {
        const res = await client.query(sql, [idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getInterests = async () => {
    let sql = 'SELECT * FROM interest';
    try {
        const res = await client.query(sql);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getInterestsUser = async (idUsr) => {
    let sql = 'SELECT * FROM users_interest, interest WHERE id_users = $1 AND interest.id_interest = users_interest.id_interest';
    try {
        const res = await client.query(sql, [idUsr]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const setInterest = async (idInterest, idUsr) => {
    let sql = 'INSERT INTO users_interest(id_users, id_interest) VALUES($1, $2) RETURNING *';
    try {
        const res = await client.query(sql, [idUsr, idInterest]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const delInterest = async (idInterest, idUsr) => {
    let sql = 'DELETE FROM users_interest WHERE id_interest = $1 AND id_users = $2';
    try {
        const res = await client.query(sql, [idInterest, idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const delAllInterest = async (idUsr) => {
    let sql = 'DELETE FROM users_interest WHERE id_users = $1';
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getNameInterest = async (idInterest) => {
    let sql = "SELECT name_interest\
                FROM interest\
                WHERE id_interest = $1";
    try {
        const res = await client.query(sql, [idInterest]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}