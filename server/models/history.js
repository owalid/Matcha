import { client } from '../connection';

export const getHistory = async (idUsr) => {
    const sql = "SELECT * FROM history WHERE id_users = $1";
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const newHistory = async (idUsr, idUsrVisited) => {
    const sql = "INSERT INTO history(id_users, id_visited_users)\
                    VALUES($1, $2) \
                    RETURNING *";
    try {
        const res = await client.query(sql, [idUsr, idUsrVisited]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const deleteAllHistory = async (idUsr) => {
    const sql = "DELETE FROM history WHERE id_users = $1";
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const deleteOneHistory = async (idUsr, idUsrVisited) => {
    const sql = "DELETE FROM history WHERE id_users = $1 AND id_visited_users = $2";
    try {
        const res = await client.query(sql, [idUsr, idUsrVisited]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}