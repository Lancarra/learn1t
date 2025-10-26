import {useAuth} from "../../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";


export const PrivateRoute = ({component, redirectTo}) => {
    const { token, loggedIn, refresing } = useAuth();
    const shouldRedirect = !loggedIn && !refresing && !token;
    return (
        shouldRedirect?<Navigate to={redirectTo} replace/>:component
    )
}