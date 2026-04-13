import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Layout({ children }) {
    const navigate=useNavigate();
    const [isOpen, setIsOpen]=useState(false);

    function handleLogout() 
    {
        localStorage.removeItem("token");
        navigate("/auth/login");
    }

    return (
        <div className={styles.layout}>

            {/* Sidebar */}
            <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
                <h2 className={styles.logo}>Collab</h2>

                <div className={styles.menu}>
                    <p onClick={() => navigate("/doc/all")}>📄 Documents</p>
                    <p onClick={() => navigate("/doc/star")}>⭐ Starred</p>
                    <p>🕒 Recent</p>
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