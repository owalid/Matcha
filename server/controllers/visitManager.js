import { verifParams } from "../utils/verifParams";
import { visit, getVisit } from "../models/visit";
import { addPopularity } from "../models/popularity";

export const newVisit = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsrVisit, idUsrVisited } = req.body;
        let result = await visit(idUsrVisit, idUsrVisited);
        let resultPopul = await addPopularity(idUsrVisited, 10);
        if (result !== false && resultPopul !== false) {
            res.status(200).json({ message: "OK" });
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const allvisits = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const result = await getVisit(req.params.id);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(500).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}