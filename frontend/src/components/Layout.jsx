import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) 
{
    const navigate=useNavigate();
    const [isOpen, setIsOpen]=useState(false);

    function handleLogout() 
    {
        localStorage.removeItem("token");
        navigate("/auth/login");
    }
    const handleRecentClick=async () => 
    {
        try 
        {
            console.log("First point")
            const res=await fetch("http://localhost:3000/doc/recent", 
            {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
            });
            const data=await res.json();
            console.log("Third point");
            console.log(data);
            if(res.ok && data.docId) navigate(`/doc/${data.docId}`);
            else alert(data.message || "No recent document found.");
        } 
        catch (err) 
        {
            console.error("Error opening recent:", err);
        }
    };

    return (
        <div className={styles.layout}>

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <h2 className={styles.logo}>Collab</h2>

                <div className={styles.menu}>
                    <p onClick={() => navigate("/doc/all")}>📄 Documents</p>
                    <p onClick={() => navigate("/doc/star")}>⭐ Starred</p>
                    <p onClick={() => handleRecentClick()}>🕒 Recent</p>
                </div>
            </div>

            {/* Main */}
            <div className={styles.main}>

                {/* Topbar */}
                <div className={styles.topbar}>

                    {/* Hamburger */}
                    <button 
                        className={styles.menuBtn}
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>

                    <h2>Workspace</h2>

                    <button 
                        className={styles.logoutBtn}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {children}
                </div>

            </div>

        </div>
    );
}

export default Layout;