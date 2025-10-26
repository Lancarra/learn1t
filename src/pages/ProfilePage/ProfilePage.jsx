import {useAuth} from "../../hooks/useAuth.js";
import profileIcon from "../../assets/profileIcon.png";
import {useIcons} from "../../hooks/useIcons.js";
import {useState} from "react";
import {useLocation} from "react-router-dom";

export const ProfilePage = () => {
    const location = useLocation();
    const {user} = useAuth();
    const icons = useIcons();
    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
/*
const [password, setPassword] = useState("");
*/
    const [role] = useState("");
    const [achievement] = useState("")
    const handleInputChange = (evt) => {
        const { name, value } = evt.target;
        switch (name) {
            case "name":
                setName(value);
                return;
            case "email":
                setEmail(value);
                return;
            default:
                return;

        }
    }
    const handleSubmit = (evt) => {
        evt.preventDefault();
    }
    return <>
    <div>
        <img src={user.blobId ?`http://127.0.0.1:10000/devstoreaccount1/user-images/${user.blobId}`: profileIcon} alt="profile" />
        <ul>
            {icons.map(({id, src}) => (<li key={id}><img src={src} width={100}/></li>))}
        </ul>
    </div>
        <form>
            <label>
                User Name
                <input type="text" name="name" value={name} onChange={handleInputChange} />
            </label>
            <label>
                Email
                <input type="text" name="email" value={email} onChange={handleInputChange} />
            </label>
            <label>
                User Role
                <input type="text" name="userRole" value={role}/>
            </label>
            <label>
                Achievement
                <input type="text" name="achievement" value={achievement}/>
            </label>
            <button type="submit">Edit</button>
        </form>
    </>
}