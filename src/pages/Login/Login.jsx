import {useState} from 'react'
import "../../styles/vars.css";
import styles from "./login.module.css";
import {NavLink} from "react-router-dom";
import {useDispatch} from "react-redux";
import {login} from "../../redux/auth/authOperations.js"

export const Login = () => {
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const dispatch = useDispatch();


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
    return (<>
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Login</h2>
                <input type="text" placeholder="Email" value={email} onChange={handleChange} name="email"/>
                <input type="text" placeholder="Password" value={password} onChange={handleChange} name="password"/>
                <button type="login">Login</button>
            </form>
                <div className={styles.authFooter}>
                <span>Don't have account?</span>
                <NavLink to = "/register">Register here.</NavLink>
                </div>
        </div>
    </>)
}