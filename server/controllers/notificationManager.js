import { verifParams } from "../utils/verifParams";
import { getNotifUser } from "../models/user";
import { notif, viewNotif, deleteNotif } from "../models/notification";

export const getNotif = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { idUsr } = req.params;
        const ret = await getNotifUser(idUsr);
        if (ret !== false) {
            return res.status(200).json({ notif: ret});
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const newNotif = async (req, res) => {
    if (verifParams(req.body, 2)) {
        const { idUsr, notification } = req.body;
        const ret = await notif(idUsr, notification);
        if (ret !== false) {
            return res.status(200).json({ message: "OK"});
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const notifView = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { idUsr } = req.params;
        const ret = await viewNotif(idUsr);
        if (ret !== false) {
            return res.status(200).json({ message: "OK"});
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const notifDelete = async (req, res) => {
    if (verifParams(req.body, 1)) {
        const { idNotif } = req.body;
        const ret = await deleteNotif(idNotif);
        if (ret !== false) {
            return res.status(200).json({ message: "OK"});
        } else {
            return res.status(500).json({ message: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}