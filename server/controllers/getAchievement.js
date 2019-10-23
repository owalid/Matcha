import { verifParams } from "../utils/verifParams";
import { getAchievementUsers, getAchievements, getAchievement } from "../models/achievement";

export const getUsersAchievement = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { id } = req.params;
        const ret = await getAchievementUsers(id);
        if (ret === false) {
            res.status(500).json({ error: "error" });
        } else {
            res.status(200).json({achievement: ret});
        }
    }
}

export const getAllAchievement = async (req, res) => {
    const ret = await getAchievements();
    if (ret === false) {
        res.status(500).json({ error: "error" });
    } else {
        res.status(200).json({achievement: ret});
    }
}

export const getOneAchievement = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { id } = req.params;
        const ret = await getAchievement(id);
        if (ret === false) {
            res.status(500).json({error: "error"});
        } else {
            res.status(200).json({achievement: ret});
        }
    }
}