import {
    userSelector,
    tokenSelector,
    loggedInSelector,
    refresingSelector,
    achievementSelector
} from "../redux/auth/authSelectors.js";
import {useSelector} from "react-redux";

export const useAuth = () => {
    const user = useSelector(userSelector);
    const token = useSelector(tokenSelector);
    const loggedIn = useSelector(loggedInSelector);
    const refresing = useSelector(refresingSelector);
    const achievement = useSelector(achievementSelector);

    return {user, token, loggedIn, refresing, achievement};
}