import { client } from '../connection';

export const notif = async (idUsr, notif) => {
    const sql = "INSERT INTO notification(id_users, notification) \
    VALUES($1, $2) \
    RETURNING *";
    try {
        const res = await client.query(sql, [idUsr, notif]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const viewNotif = async (idUsr) => {
    const sql = "UPDATE notification \
                    SET view = 0 \
                    WHERE id_users = $1\
    RETURNING *";
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const deleteNotif = async (idnotif) => {
    const sql = "DELETE FROM notification \
    WHERE id_notif = $1\
    RETURNING *";
    try {
        const res = await client.query(sql, [idnotif]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}