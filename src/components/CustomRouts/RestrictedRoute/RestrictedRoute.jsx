import {useAuth} from "../../../hooks/useAuth.js";
import {Navigate} from "react-router-dom";

export const RestrictedRoute = ({component, redirectTo}) => {
    const {loggedIn, user} = useAuth();
    const adminPanel = user.roleName === "Admin;";
    if (adminPanel)
    {
        return <Navigate to={"/admin/panel"}/>
    }
    if (user.roleName === "Teacher;")
    {
        return <Navigate to={`/teacher/${user.userId}`}/>
    }

    return (
        loggedIn? <Navigate to={redirectTo}/>:component
    )
}