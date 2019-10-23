import { client } from '../connection';

export const visit = async (idUsrVisit, idUsrVisited) => {
    const sql = "INSERT INTO visit(id_users_visit, id_users_visited) \
                VALUES($1, $2) \
                RETURNING *";
    try {
        const res = await client.query(sql, [idUsrVisit, idUsrVisited]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getVisit = async (idUsr) => {
    const sql = "SELECT * FROM visit WHERE id_users_visited = $1";
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}