import { getInterest } from "./interest";
import { countMatching } from "../utils/countMatching";

export const getNumberInterestMatch = async (idUsr1, idUsr2) => {
    let interest1 = getInterest(idUsr1);
    let interest2 = getInterest(idUsr2);
    return countMatching(interest1, interest2);
}