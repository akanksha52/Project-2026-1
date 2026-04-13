// StarredPage.jsx
import styles from "./Display.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

function StarredDisplay() 
{
    const [docs, setDocs]=useState([]);
    const navigate=useNavigate();

    useEffect(() => 
    {
        fetch("http://localhost:3000/doc/star", 
        {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        })
        .then(res => res.json())
        .then(data => setDocs(data))
        .catch(err => console.error(err));
    }, []);

    async function toggleStar(id) 
    {
        const res=await fetch(`http://localhost:3000/doc/star/${id}`, 
        {
            method: "POST",
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        if(res.ok) setDocs(prev => prev.filter(doc => doc._id !== id));
        else
        {
            console.log("Starred document error occured");
            console.log(err);
        }
    }

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h1 className={styles.title}>Starred Documents</h1>
                </div>
                {docs.length === 0 ? (
                    <div className={styles.empty}><h2>No starred docs</h2></div>
                ) : (
                    <div className={styles.grid}>
                        {docs.map(doc => (
                            <div key={doc._id} className={`${styles.card} ${styles.cardStarred}`} onClick={() => navigate(`/doc/${doc._id}`)}>
                                <div className={styles.docTitle}>{doc.title}</div>
                                <div className={styles.meta}>Updated: {new Date(doc.updatedAt).toLocaleDateString()}</div>
                                <button 
                                    className={`${styles.starBtn} ${styles.starActive}`}
                                    onClick={(e) => { e.stopPropagation(); toggleStar(doc._id); }}
                                >★</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Layout>
    );
}

export default StarredDisplay;