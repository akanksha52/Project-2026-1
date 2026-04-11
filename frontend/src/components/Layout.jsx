import styles from "./Layout.module.css";
import { useNavigate } from "react-router-dom";

function Layout({ children }) 
{
    const navigate=useNavigate();

    function handleLogout() 
    {
        localStorage.removeItem("token");
        navigate("/auth/login");
    }
    return (
        <div className={styles.layout}>
            {/* Sidebar */}
            <div className={styles.sidebar}>
                <h2 className={styles.logo}>Collab</h2>
                <div className={styles.menu}>
                    <p onClick={() => navigate("/docs/all")}>📄 Documents</p>
                    <p>⭐ Starred</p>
                    <p>🕒 Recent</p>
                </div>
            </div>
            {/* Main Area */}
            <div className={styles.main}>
                {/* Top Header */}
                <div className={styles.topbar}>
                    <h2>Workspace</h2>
                    <button 
                        className={styles.logoutBtn}
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </div>
                {/* Page Content */}
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    );
}

export default Layout;