import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

function Login()
{
    const [field, setField]=useState("");
    const [password, setPassword]=useState("");
    async function handleLogin() 
    {
        const res=await fetch
        (
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
        if(data.token) 
        {
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard";
        } 
        else 
        {
            alert(data.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Login</h2>
                <form onSubmit={handleLogin} action="/auth/login" method="POST">
                    
                    <div className={styles.inputGroup}>
                        <label>Email or Phone number</label>
                        <input type="text" name="field" required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" name="password" required/>
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