import { useState } from "react";
import styles from "./Auth.module.css";
import { Link } from "react-router-dom";

function Signup()
{
    const [phone, setPhone]=useState("");
    const [email, setEmail]=useState("");
    const [password, setPassword]=useState("");
    async function handleSignup(e) 
    {
        e.preventDefault();
        const res=await fetch
        (
            "http://localhost:3000/auth/signup", 
            {
                method: "POST",
                headers: 
                {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({phone, email, password })
            }
        );
        const data=await res.json();
        if(res.ok) 
        {
            alert("Signup successful");
            window.location.href = "/"; // go to login
        } 
        else 
        {
            alert(data.message);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.formBox}>
                <h2>Create Account</h2>
                <form onSubmit={handleSignup} action="/auth/signup" method="POST">

                    <div className={styles.inputGroup}>
                        <label>Phone</label>
                        <input type="text" name="phone" onChange={(e) => setPhone(e.target.value)}required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Email</label>
                        <input type="email" name="email" onChange={(e) => setPhone(e.target.value)} required/>
                    </div>

                    <div className={styles.inputGroup}>
                        <label>Password</label>
                        <input type="password" name="password" onChange={(e) => setPhone(e.target.value)} required/>
                    </div>

                    <button className={styles.submitBtn} type="submit">Sign Up</button>

                    <br/>
                    <br/>

                    <p className={styles.switch}>
                        Already have an account? 
                        <Link to="/auth/login">Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup;