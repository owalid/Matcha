import { client } from '../connection';

export const isBlocked = async (idUsrBlock, idUsrBlocked) => {
    const sql = "SELECT * FROM block WHERE id_users_block = $1 AND id_users_blocked = $2";
    try {
        const res = await client.query(sql, [idUsrBlock, idUsrBlocked]);
        return (res.rows[0]) ? true : false;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const isReport = async (idUsrReport, idUsrReported) => {
    const sql = "SELECT * FROM report WHERE id_users_report = $1 AND id_users_reported = $2";
    try {
        const res = await client.query(sql, [idUsrReport, idUsrReported]);
        return (res.rows[0]) ? true : false;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getUserBlocked = async (idUsrBlock) => {
    const sql = "SELECT id_users_blocked FROM block WHERE id_users_block = $1";
    try {
        const res = await client.query(sql, [idUsrBlock]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;;
    }
}

export const getUserBlock = async (idUsrBlocked) => {
    const sql = "SELECT id_users_block FROM block WHERE id_users_blocked = $1";
    try {
        const res = await client.query(sql, [idUsrBlocked]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;;
    }
}

export const blockUser = async (idUsrBlock, idUsrBlocked) => {
    const sql = "INSERT INTO block(id_users_block, id_users_blocked) \
                    VALUES($1, $2) \
                    RETURNING *";
    try {
        let result = await client.query(sql, [idUsrBlock, idUsrBlocked]);
        return (result)
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const unblockUser = async (idUsrBlock, idUsrBlocked) => {
    const sql = "DELETE FROM block \
                WHERE id_users_block = $1 AND id_users_blocked = $2";
    try {
        await client.query(sql, [idUsrBlock, idUsrBlocked]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;;
    }
}

export const reportUser = async (idUsrReported, idUsrReporteded) => {
    const sql = "INSERT INTO report(id_users_report, id_users_reported) \
                    VALUES($1, $2) \
                    RETURNING *";
    try {
        await client.query(sql, [idUsrReported, idUsrReporteded]);
        return true;
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}