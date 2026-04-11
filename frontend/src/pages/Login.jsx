import { useState } from "react";
import styles from "./Auth.module.css";
import { Link} from "react-router-dom";
import { useNavigate } from "react-router-dom";

function Login()
{
    const [field, setField]=useState("");
    const [password, setPassword]=useState("");
    const navigate=useNavigate();
    async function handleLogin(e) 
    {
        e.preventDefault();
        const res=await fetch (
            "http://localhost:3000/auth/login", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ field, password })
            }
        );
        const data=await res.json();
        if(res.ok) 
        {
            localStorage.setItem("token", data.token);
            navigate("/docs/all"); 
        } 
        else 
        {
            alert(data.message || "Login failed ❌");
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    
                    <div className={styles.inputGroup}>
                        <label>Email or Phone number</label>
                        <input onChange={(e) => setField(e.target.value)} type="text" name="field" required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input onChange={(e) => setPassword(e.target.value)} type="password" name="password" required/>
                    </div>

                    <button className={styles.submitBtn} type="submit">Login</button>

                    <p className="switch">
                        Don't have an account?
                        <Link to="/auth/signup">Create Account</Link>
                    </p>

                </form>
            </div>
        </div>
    )
}

export default Login;