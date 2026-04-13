import styles from "./Display.module.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout.jsx";

function DisplayAll() {
    const [docs, setDocs]=useState([]);
    const navigate=useNavigate();

    useEffect(() => 
    {
        fetch("http://localhost:3000/doc/all", 
        {
            headers: 
            {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => setDocs(data))
        .catch(err => console.error(err));
    }, []);

    async function handleNewDoc() 
    {
        const token=localStorage.getItem("token");
        const res=await fetch("http://localhost:3000/doc", {
            method: "POST",
            headers: 
            {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify({ title: "untitled document" })
        });
        const data=await res.json();
        if (res.ok) 
        {
            navigate(`/doc/${data._id}`); 
        } 
        else 
        {
            alert(data.message);
        }
    };

    function openDoc(id) 
    {
        navigate(`/doc/${id}`);
    };

    function handleLogout() 
    {
        localStorage.removeItem("token");
        navigate("/auth/login");
    };

    async function toggleStar(id)
    {
        const token=localStorage.getItem("token");
        const res=await fetch(`http://localhost:3000/doc/star/${id}`, 
        {
            method: "POST",
            headers:
            {
                Authorization: `Bearer ${token}`
            }
        });
        if(res.ok) 
        {
            setDocs(prevDocs =>
                prevDocs.map(doc =>
                    doc._id===id
                    ? { ...doc, isStarred: !doc.isStarred }
                    : doc
                ));
        }
        else
        {
            console.log("Error occccured");
        }
    };

    return (
        <Layout>
        <div className={styles.container}>

            {/* Header */}
            <div className={styles.header}>
                <h1 className={styles.title}>Your Documents</h1>

                <div className={styles.actions}>
                    <button className={styles.newBtn} onClick={handleNewDoc}>
                        + New
                    </button>

                    <button className={styles.logoutBtn} onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </div>

            {/* Empty state */}
            {
                Array.isArray(docs) && docs.length==0 && (
                    <div className={styles.empty}>
                        <h2>No documents yet</h2>
                        <p>Create your first document 🚀</p>
                    </div>
                )
            }

            {/* Docs Grid */}
            <div className={styles.grid}>
            {
                Array.isArray(docs) && docs.map((doc) => (
                    <div 
                        key={doc._id} 
                        className={`${styles.card} ${doc.isStarred ? styles.cardStarred : ""}`}
                        onClick={() => openDoc(doc._id)}
>
                        <div className={styles.docTitle}>
                            {doc.title}
                        </div>

                        <div className={styles.meta}>
                            Updated: {new Date(doc.updatedAt).toLocaleDateString()}
                        </div>
                        <button
                            className={`${styles.starBtn} ${doc.isStarred ? styles.starActive : ""}`}
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleStar(doc._id);
                            }}
                        >
                            {doc.isStarred ? "★" : "☆"}
                        </button>
                    </div>
                ))
            }
            </div>

        </div>
        </Layout>
    );
}

export default DisplayAll;