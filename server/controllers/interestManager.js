import { getInterests, getInterestsUser } from "../models/interest";

export const getAllInterest = async (req, res) => {
    const ret = await getInterests();
    if (ret !== false) {
        res.status(200).json({ interest: ret });
    } else {
        res.status(500).json({ error: "Error" });
    }
}

export const getUserInterest = async (req, res) => {
    const ret = await getInterestsUser(req.params.idUsr);
    if (ret !== false) {
        res.status(200).json({interest: ret});
    } else {
        res.status(500).json({ error: "Error" });
    }
}