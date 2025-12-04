import {useState} from 'react'
import "../../styles/vars.css";
import styles from "./register.module.css";
import {NavLink} from "react-router-dom";
import {register} from "../../redux/auth/authOperations.js"
import {useDispatch} from "react-redux";
import {IoIosEye, IoIosEyeOff} from "react-icons/io";

export const Register = () => {
    const [username,setusername]=useState("")
    const [email,setemail]=useState("")
    const [password,setpassword]=useState("")
    const [confirmpassword,setconfirmpassword]=useState("")
    const [role, setRole] = useState("")
    const dispatch = useDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const toggleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    }

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
            default:
                return;
        }
    }
    const handleRoleChange = (e)=>{
        setRole(e.target.value)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await dispatch(register({email, password, username, roleName:role}))
        setemail("");
        setpassword("");
        setconfirmpassword("");
        setusername("");
        setRole("");
    };

    return (<>
        <div className={styles.authContainer}>
            <form onSubmit={handleSubmit}>
                <h2 className={styles.formTitle}>Register</h2>
                <input type="text" placeholder="Username" value={username} onChange={handleChange} name="username"/>
                <input type="email" placeholder="Email" value={email} onChange={handleChange} name="email"  pattern="^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$"
                       title="Enter a valid email address (for example, name@example.com)"/>
                <div className={styles.passwordWrapper}>
                    <input type={!showPassword?"password":"text"} placeholder="Password" value={password} onChange={handleChange} name="password" className={styles.passwordInput}/>
                    <button type = "button" onClick={toggleShowPassword} className={styles.eyeButton}>{!showPassword?<IoIosEye size = {22}/>:<IoIosEyeOff size = {22}/> }</button>
                </div>
                <div className={styles.passwordWrapper}>
                    <input type={!showConfirmPassword?"password":"text"} placeholder="Confirm Password" value={confirmpassword} onChange={handleChange} name="confirmpassword" className={styles.passwordInput}/>
                    <button type = "button" onClick={toggleShowConfirmPassword} className={styles.eyeButton}>{!showConfirmPassword?<IoIosEye size = {22}/>:<IoIosEyeOff size = {22}/>}</button>
                </div>
                <div className={styles.selectWrapper}>
                    <select value={role} onChange={handleRoleChange} className={styles.select} required>
                        <option value="" disabled>Select role</option>
                        <option value="Student">Student</option>
                        <option value="Teacher">Teacher</option>
                    </select>
                </div>
                <button type="submit" disabled={password !== confirmpassword || password === "" || confirmpassword === ""}>Register</button>
            </form>
            <p>You have account?</p>
            <NavLink to = "/login">Login here.</NavLink>
        </div>
    </>)
}