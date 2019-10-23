import { client } from '../connection';

//---BONUS---
// visit +10
// search +20
// like +5
// match +1
// unblock +30

//---MALUS---
// report -50
// block -30
// unlike -5

export const addPopularity = async (num, idUsr) => {
    const sql = "UPDATE users SET popular_score = popular_score + $1 WHERE id_users = $2;"
    try {
        const ret = await client.query(sql, [num, idUsr]);
        return (ret.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}