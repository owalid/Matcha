import { verifParams } from "../utils/verifParams";
import { blockUser, unblockUser, reportUser } from "../models/report";
import { addPopularity } from "../models/popularity";
import { getAllMatchUsr, delMatch } from "../models/like";

export const block = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrBlock, idUsrBlocked } = req.body;
        const isMatch = await getAllMatchUsr(idUsrBlock);
        if (!isMatch || isMatch.length <= 0) {
            const result = await blockUser(idUsrBlock, idUsrBlocked);
            const retPopularity = await addPopularity(idUsrBlocked, -30)
            if (result !== false && retPopularity !== false
                && isMatch !== false) {
                return res.status(200).json({ message: "OK !" });
            } else {
                return res.status(500).json({ error: "error" });
            }
        }
        if (isMatch[0].id_users_liked == idUsrBlocked) {
            const delLike = await delMatch(isMatch[0].id_match);
            if (delLike === false) {
                return res.status(500).json({ error: "error" });
            }
        }
        const result = await blockUser(idUsrBlock, idUsrBlocked);
        const retPopularity = await addPopularity(idUsrBlocked, -30)
        if (result !== false && retPopularity !== false
            && isMatch !== false) {
            return res.status(200).json({ message: "OK !" });
        } else {
            return res.status(500).json({ error: "error" });
        }
       
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const unblock = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrBlock, idUsrBlocked } = req.body;
        let result = await unblockUser(idUsrBlock, idUsrBlocked);
        await addPopularity(idUsrBlock, 30)
        if (result) {
            res.status(200).json({ message: "User unblocked" });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const report = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrReport, idUsrReported } = req.body;
        if (await reportUser(idUsrReport, idUsrReported) !== false
            && await addPopularity(idUsrReport, -50) !== false) {
            res.status(200).json({ message: "OK" });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}