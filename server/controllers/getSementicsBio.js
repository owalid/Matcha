import { getBio, changeSementicBio } from "../models/user";
import request from 'request';
import { verifParams } from "../utils/verifParams";

export const getSementicBio = async (req, res) => {
    if (verifParams(req.params, 1)) {
        const { idUser } = req.params;
        let bio = await getBio(idUser);
        if (bio !== false) {
            bio = JSON.stringify(bio);
            let sementic = 0;
            const requestApi = `http://api.ai-applied.nl/api/text_analysis_api/?request={"data":{"api_key":"d834890643dcb661ecd5dbb76bae62da4672b02c7d9f227aa07fc63019d111b6","call":{"return_original":true,"sentiment_classifier":"subjective","data":[{"text":${bio},"id":1}]}}}`
            request.get(requestApi, (err, httpResponse, body) => {
                if (err) {
                    console.error('Error:', err);
                    return null;
                }
                else {
                    const resSementic = JSON.parse(httpResponse.body).response.data[0].sentiment_class;
                    if (resSementic === "positive")
                        sementic = 1;
                    else if (resSementic === "negative")
                        sementic = -1;
                }
            })
            if (await changeSementicBio(idUser, sementic)) {
                res.status(200).json({ message: sementic });
            } else {
                res, status(400).json({ error: "error" });
            }
        } else {
            res, status(400).json({ error: "error" });
        }
    } else {
        return res.status(500).json({ error: "Error params" });
    }
}