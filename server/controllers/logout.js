import { verifParams } from "../utils/verifParams";
import { switchToLogout } from "../models/user";

export const logout = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const {idUsr, date} = req.body;
        const ret = await switchToLogout(idUsr, date);
        if (ret === false) {
            return res.status(500).json({ message: "Err" });
        } else {
            return res.status(200).json({ message: "OK" });
        }
    } else {
        return res.status(500).json({ error: "error Params" });
    }
}