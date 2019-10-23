import { getAllMatchUsr } from "../models/like"
import { verifParams } from "../utils/verifParams"

export const getAllMatchUser = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const ret = await getAllMatchUsr(req.params.id);
        if (ret === false) {
            return res.status(500).json({error: "error SQL"});
        } else {
            return res.status(200).json({res: ret});
        }
    }
}