import { getOneAchievement } from "./getAchievement";

export const achievementLikeManager = async (req, achievementLike) => {
    let picture;
    switch (achievementLike) {
        case 1:
            picture = await getOneAchievement(1).path;
            req.app.io.emit('achievementLike1', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 2:
            picture = await getOneAchievement(2).path;
            req.app.io.emit('achievementLike2', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 3:
            picture = await getOneAchievement(3).path;
            req.app.io.emit('achievementLike3', { message: "Nouvel achievement debloqué", picture: picture });
            break;
    }
}

export const achievementMatchManager = async (req, achievementMatch) => {
    let picture;
    switch (achievementMatch) {
        case 1:
            picture = await getOneAchievement(4).path;
            req.app.io.emit('achievementMatch1', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 2:
            picture = await getOneAchievement(5).path;
            req.app.io.emit('achievementMatch2', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 3:
            picture = await getOneAchievement(6).path;
            req.app.io.emit('achievementMatch3', { message: "Nouvel achievement debloqué", picture: picture });
            break;
    }
}

export const achievementMessageManager = async (req, achievementMessage) => {
    let picture;
    switch (achievementMessage) {
        case 1:
            picture = await getOneAchievement(7).path;
            req.app.io.emit('achievementMessage1', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 2:
            picture = await getOneAchievement(8).path;
            req.app.io.emit('achievementMessage2', { message: "Nouvel achievement debloqué", picture: picture });
            break;
        case 3:
            picture = await getOneAchievement(9).path;
            req.app.io.emit('achievementMessage3', { message: "Nouvel achievement debloqué", picture: picture });
            break;
    }
}