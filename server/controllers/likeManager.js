import { like, isLiked, unlike, newMatch, getLike, delMatch, getMatchId } from "../models/like";
import { addPopularity } from "../models/popularity";
import { verifParams } from "../utils/verifParams";
import { achievementLikeManager, achievementMatchManager } from "./achievementManager";

export const newLike = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrLike, idUsrLiked } = req.body;
        const achievementLike = await like(idUsrLike, idUsrLiked, '1');
        await achievementLikeManager(req, achievementLike);
        if (achievementLike !== false
                    && await addPopularity(idUsrLiked, 5) !== false) {
            const likeBack = await isLiked(idUsrLiked, idUsrLike);
            if (likeBack === null) {
                return res.status(500).json({ message: "Error" });
            } else if (likeBack === true) {
                const like = await getLike(idUsrLike, idUsrLiked);
                const achievementMatch = await newMatch(like.id_like, idUsrLike, idUsrLiked);
                await achievementMatchManager(req, achievementMatch);
                if (achievementMatch !== false && like !== false) {
                    return res.status(200).json({ message: "New match" })
                } else {
                    return res.status(500).json({ error: "error match" });
                }
            } else {
                return res.status(200).json({ message: "OK" });
            }
        } else {
            return res.status(500).json({ message: "Error Lol" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const newDislike = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrLike, idUsrLiked } = req.body;
        if (await addPopularity( -5, idUsrLiked) !== false
                && await like(idUsrLike, idUsrLiked, '0') !== false) {
            return res.status(200).json({ message: "OK" })
        } else {
            return res.status(500).json({ message: "Error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const newUnlike = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, idUsrLiked } = req.body;
        if (await unlike(idUsr, idUsrLiked) !== false 
                && await addPopularity(idUsrLiked, -5) !== false) {
            res.status(200).json({message: "OK"})
        } else {
            res.status(500).json({error: "error"});
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const deleteMatch = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const {idMatch} = req.body;
        const match = await getMatchId(idMatch);
        if (!match || match.length == 0) {
            return res.status(200).json({msg: "NO MATCH"});
        }
        if (await delMatch(idMatch) !== false) {
            res.status(200).json({message: "OK"});
        } else {
            res.status(500).json({error: "error"});
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}