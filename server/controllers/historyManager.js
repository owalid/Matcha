import { verifParams } from "../utils/verifParams";
import { newHistory, getHistory, deleteAllHistory, deleteOneHistory } from "../models/history";

export const addHistory = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, idUsrVisited } = req.body;
        let result = await newHistory(idUsr, idUsrVisited);
        if (result) {
            res.status(200).json({ message: "OK" });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const history = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const result = await getHistory(req.params.id);
        if (result) {
            res.status(200).json({ result: result });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const delAllHistory = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const { idUsr } = req.body;
        const ret = await deleteAllHistory(idUsr);
        if (ret) {
            return res.status(200).json({ message: "Information deleted" });
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const delOneHistory = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, idUsrVisited } = req.body;
        const ret = await deleteOneHistory(idUsr, idUsrVisited);
        if (ret) {
            return res.status(200).json({ message: "Information deleted" });
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}