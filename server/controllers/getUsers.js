import { getUserBlocked, getUserBlock } from '../models/report';
import { dateToAge } from '../utils/ageDate';
import { getAllUsers } from '../models/user';
import { getUser } from '../models/user';
import { getUserLiked } from '../models/like';
import { verifParams } from '../utils/verifParams';
import { getInterestsUser } from '../models/interest';

export const getUsersFilter = async (req, res) => {
    if (verifParams(req.params, 1)) {
        let result, blockUser, blockedUser, likedUser = [];
        const id = req.params.id;
        const user = await getUser(id) || false;
        const userBlock = await getUserBlock(id) || false;
        const userBlocked = await getUserBlocked(id) || false;
        const userliked = await getUserLiked(id) || false;
        const allUsers = await getAllUsers(user.sexual_or, user.gender, id);
        if (user === false || userBlock === false
            || userBlocked === false || allUsers === false)
            return res.status(500).json({ error: "error lol" });
        if (userBlocked !== false)
            blockedUser = Object.keys(userBlocked).map(key => userBlocked[key].id_users_blocked);
        if (userBlock !== false)
            blockUser = Object.keys(userBlock).map(key => userBlock[key].id_users_block);
        if (userliked !== false)
            likedUser = Object.keys(userliked).map(key => userliked[key].id_users_liked);
        result = allUsers.filter(e => !blockedUser.includes(e.id_users)
            && !blockUser.includes(e.id_users)
            && !likedUser.includes(e.id_users)
            && dateToAge(e.date_of_birth) <= user.age_max
            && dateToAge(e.date_of_birth) >= user.age_min);
        result.sort((a, b) => {
            let popularA = a.popular_score;
            let popularB = b.popular_score;
            let comp = 0;
            if (popularA < popularB) {
                comp = 1;
            } else if (popularA > popularB) {
                comp = -1;
            }
            return comp;
        });
        result = await Promise.all(result.map(async r => {
            return {
                user: r,
                interest: await getInterestsUser(r.id_users)
            }
        }));
        return res.status(200).send(result);
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}

export const getInfosUser = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const id = req.params.idUser;
        let result = await getUser(id);
        let interest = await getInterestsUser(id);
        if (result) {
            res.status(200).json({ result, interest });
        } else {
            res.status(200).json({});
        }
    } else {
        res.status(500).json({ error: "Error params" });
    }
}