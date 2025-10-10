import {userSelector, tokenSelector, loggedInSelector, refresingSelector} from "../redux/auth/authSelectors.js";
import {useSelector} from "react-redux";

export const useAuth = () => {
    const user = useSelector(userSelector);
    const token = useSelector(tokenSelector);
    const loggedIn = useSelector(loggedInSelector);
    const refresing = useSelector(refresingSelector);

    return {user, token, loggedIn, refresing};
}