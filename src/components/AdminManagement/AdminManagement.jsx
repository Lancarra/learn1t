import {NavLink} from "react-router-dom";

export const AdminManagement = ({title, text, src, icon, btnText}) => {
    return <>
        <p>{title}</p>
        <p>{text}</p>
        <NavLink to = {src}>{icon} {btnText}</NavLink>
    </>
}