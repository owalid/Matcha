import { client } from '../connection';
import { message } from '../controllers/messageManager';

export const sendMessage = async (idUsers, idMatch, content, date) => {
    const sql = "SELECT * FROM achievement_message($1, $2, $3, $4)";
    const lastestMsg = "SELECT id_message from message where id_users = $1 and content = $2 and id_match = $3"
    try {
        const res = await client.query(sql, [idUsers, idMatch, content, date]);
        const result = await client.query(lastestMsg, [idUsers, content, idMatch])
        return (result.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getMessage = async (idUsers) => {
    const sql = "SELECT message.content, message.date_message, users.last_name, users.first_name \
                FROM message, users \
                WHERE message.id_users = $1 \
                AND users.id_users = $1";
    try {
        const res = await client.query(sql, [idUsers]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getAllMessage = async (idMatch) => {
    const sql = "SELECT * \
                FROM message, match\
                WHERE message.id_match = $1\
                AND match.id_match = message.id_match\
                ORDER BY date_message";
    try {
        const res = await client.query(sql, [idMatch]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getOneMessage = async (idMessage) => {
    const sql = "SELECT * \
                FROM message\
                WHERE message.id_message = $1";
    try {
        const res = await client.query(sql, [idMessage]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}


export const deleteMessage = async (idMessage) => {
    const sql = "DELETE FROM message WHERE id_message = $1";
    try {
        const res = await client.query(sql, [idMessage]);
        return res.rows;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}