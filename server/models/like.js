import { client } from '../connection';

export const isLiked = async (idUsrLike, idUsrLiked) => {
    const sql = 'SELECT * FROM "like" WHERE id_users_like = $1 AND id_users_liked = $2 AND "like" = true';
    try {
        const res = await client.query(sql, [idUsrLike, idUsrLiked]);
        return (res.rows[0]) ? true : false;
    } catch (e) {
        console.error(e.stack);
        return null;
    }
}

export const getLike = async (idUsrLike, idUsrLiked) => {
    const sql = 'SELECT id_like, "like" FROM "like" WHERE id_users_like = $1 AND id_users_liked = $2';
    try {
        const res = await client.query(sql, [idUsrLike, idUsrLiked]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;;
    }
}

export const getUserLiked = async (idUsrLike) => {
    const sql = 'SELECT * FROM "like" WHERE id_users_like = $1';
    try {
        const res = await client.query(sql, [idUsrLike]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;;
    }
}

export const unlike = async (idUsrLike, idUsrLiked) => {
    const sql = 'DELETE FROM "like" \
                WHERE id_users_like = $1 AND id_users_liked = $2';
    try {
        const res = await client.query(sql, [idUsrLike, idUsrLiked]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const like = async (idUsrLike, idUsrLiked, like) => {
    const sql = 'SELECT * FROM achievement_like($1, $2, $3)';
    try {
        const res = await client.query(sql, [idUsrLike, idUsrLiked, like]);
        return (res.rows[0].achievement_like);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const newMatch = async (idLike, idUsrLike, idUsrLiked) => {
    const mid = Math.floor(Math.random() * (99999 - 10000) + 10000);
    const sql = 'SELECT * FROM achievement_match($1, $2, $3, $4)';
    try {
        const res = await client.query(sql, [idLike, idUsrLike, idUsrLiked, mid]);
        return (res.rows[0].achievement_match);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const delMatch = async (idMatch) => {
    const delMessage = 'DELETE FROM message WHERE id_match = $1'
    const sql = 'DELETE FROM match WHERE id_match = $1';
    try {
        let res = await client.query(delMessage, [idMatch]);
        res = await client.query(sql, [idMatch]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getAllMatchUsr = async (idUser) => {
    const sql = `SELECT users.first_name, users.is_logged, users.last_log, users.picture, match.id_match, users.id_users as id_users_liked, 
                (SELECT id_message from message where message.id_match = match.id_match ORDER BY message.id_message desc LIMIT 1 ) as id_message
                FROM "like", "match", users 
                WHERE "like".id_like = "match".id_like 
                AND ("like".id_users_like = $1 OR "like".id_users_liked = $1)
                AND "users".id_users != $1
                AND ("like".id_users_liked = "users".id_users AND "like".id_users_liked != $1 OR "like".id_users_like = "users".id_users AND "like".id_users_like != $1)`

    try {
        const res = await client.query(sql, [idUser]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getMatchId = async (idMatch) => {
    const sql = "SELECT mid \
                FROM match \
                WHERE id_match = $1";
    try {
        const res = await client.query(sql, [idMatch]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}