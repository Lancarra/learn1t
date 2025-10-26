import {useAuth} from "../../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";

export const RestrictedRoute = ({component, redirectTo}) => {
    const {loggedIn} = useAuth();
    return (
        loggedIn? <Navigate to={redirectTo}></Navigate>:component
    )
}