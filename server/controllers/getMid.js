import { getMatchId } from "../models/like";
import { verifParams } from "../utils/verifParams";

export const getMid = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { idMatch } = req.params;
        const ret = await getMatchId(idMatch);
        if (ret !== false) {
            return res.status(200).json({ mid: ret });
        } else {
            return res.status(200).json({});
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}