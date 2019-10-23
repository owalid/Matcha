import { client } from '../connection';

export const getAchievements = async () => {
    const sql = "SELECT * FROM achievement";
    try {
        const res = await client.query(sql);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getAchievement = async (id) => {
    const sql = "SELECT * FROM achievement WHERE id_achievement = $1"
    try {
        const res = await client.query(sql, [id]);
        return (res.rows[0]);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}

export const getAchievementUsers = async (idUsr) => {
    const sql = "SELECT achievement.path, achievement.id_achievement FROM users_achievement, achievement \
                    WHERE users_achievement.id_users = $1 \
                    AND users_achievement.id_achievement = achievement.id_achievement"
    try {
        const res = await client.query(sql, [idUsr]);
        return (res.rows);
    } catch (e) {
        console.error(e.stack);
        return false;
    }
}