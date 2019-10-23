import { verifParams } from "../utils/verifParams";
import { sendMessage, deleteMessage, getMessage, getAllMessage, getOneMessage } from "../models/message";
import { achievementMessageManager } from "./achievementManager";
import { getMatchId } from "../models/like";

export const sendMsg = async (req, res) => {
    if (verifParams(req.body, 4)) {
        const { idUsr, idMatch, content, date } = req.body;
        const match = await getMatchId(idMatch);
        if (!match || match.length == 0) {
            return res.status(200).json({msg: "NO MATCH"});
        }
        const result = await sendMessage(idUsr, idMatch, content, date);
        await achievementMessageManager(req, result);
        if (result !== false) {
            res.status(200).json({ message: "OK", id: result});
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const deleteMsg = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const result = await deleteMessage(req.body.idMsg);
        if (result !== false) {
            res.status(200).json({ message: "OK" });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const message = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const result = await getMessage(req.params.id);
        if (result) {
            res.status(200).json({ result: result });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const allMessage = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const result = await getAllMessage(req.params.id);
        if (result !== false) {
            res.status(200).json({ result: result });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const oneMessage = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const result = await getOneMessage(req.params.idMsg);
        if (result !== false) {
            res.status(200).json({ result: result });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}