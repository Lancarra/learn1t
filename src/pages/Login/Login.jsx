import {useState} from 'react'
import "../../styles/vars.css";
import styles from "./login.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../redux/auth/authOperations.js"
import { IoIosEye, IoIosEyeOff  } from "react-icons/io";


export const Login = () => {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }
    const handleChange=(e)=>{
        const{name, value} = e.target
        switch(name){
            case "email":
                setemail(value)
                return;
            case "password":
                setpassword(value)
                return;
            default:
                return;
        }
    }
    const handleSubmit = async (e)=>{
        e.preventDefault()
        await dispatch(login({email, password, googleAuthCode: " ", fromOtherService: true, googleAuthKey: " ", verificationString: " "}))
        setpassword("");
        setemail("");
    }
    const isLoginValid = email.trim() !== "" && password.trim() !== "";

    return (<>
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Login</h2>
                <input type="text" placeholder="Email" value={email} onChange={handleChange} name="email"/>
                <div className={styles.passwordWrapper}>
                    <input type={!showPassword?"password":"text"} placeholder="Password" value={password} onChange={handleChange} name="password" className={styles.passwordInput}/>
                    <button type = "button" onClick={toggleShowPassword}  className={styles.eyeButton}>{!showPassword?<IoIosEye size = {24}/>:<IoIosEyeOff size = {24}/>}</button>
                </div>
                <button type="submit" disabled={!isLoginValid}>Login</button>
            </form>
                <div className={styles.authFooter}>
                <span>Don't have account?</span>
                <NavLink to = "/register">Register here.</NavLink>
                </div>
        </div>
    </>)
}