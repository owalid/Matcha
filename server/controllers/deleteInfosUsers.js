import { deletePicture } from "../models/user";
import { verifParams } from "../utils/verifParams";

export const delPicture = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, index } = req.body;
        const ret = await deletePicture(idUsr, index);
        if (ret !== false) {
            return res.status(200).json({ message: "Information deleted" });
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}