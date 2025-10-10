import {useState} from 'react'
import "../../styles/vars.css";
import styles from "./register.module.css";
import {NavLink} from "react-router-dom";
import {register} from "../../redux/auth/authOperations.js"
import {useDispatch} from "react-redux";

export const Register = () => {
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const [selected, setselected]=useState(null)
    const dispatch = useDispatch();

    const handleChange=(e)=>{
        const{name, value} = e.target
        switch(name){
            case "username":
                setusername(value)
                return;
            case "email":
                setemail(value)
                return;
            case "password":
                setpassword(value)
                return;
            case "confirmpassword":
                setconfirmpassword(value)
                return;
            case "radio":
                setselected(value)
                return;
                default:
                    return;
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(register({email, password, username}))
        setemail("");
        setpassword("");
        setconfirmpassword("");
        setusername("");
    }
    return (<>
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Register</h2>
                <input type="text" placeholder="Username" value={username} onChange={handleChange} name="username"/>
                <input type="text" placeholder="Email" value={email} onChange={handleChange} name="email"/>
                <input type="text" placeholder="Password" value={password} onChange={handleChange} name="password"/>
                <input type="text" placeholder="Confirm Password" value={confirmpassword} onChange={handleChange} name="confirmpassword"/>
                <label>
                    Student
                    <input type="radio" value="Student" checked={selected==="Student"} onChange={handleChange} name="radio"/>
                </label>
                <label>
                    Teacher
                <input type="radio" value="Teacher" checked={selected==="Teacher"} onChange={handleChange} name="radio"/>
                </label>
                <button type="submit" disabled={password !== confirmpassword || password === "" || confirmpassword === ""}>Register</button>
            </form>
            <p>You have account?</p>
            <NavLink to = "/login">Login here.</NavLink>
        </div>
    </>)
}