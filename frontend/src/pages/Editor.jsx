import styles from "./Editor.module.css";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

function Editor() 
{
    const { id }=useParams();
    const navigate=useNavigate();

    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [saving, setSaving]=useState(false);
    const [dirty, setDirty]=useState(false);
    const [autosave, setAutosave]=useState(false);

    useEffect(() => 
    {
        fetch(`http://localhost:3000/doc/${id}`, 
        {
            headers: 
            {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => {
            setTitle(data.title);
            setContent(data.content);
            setDirty(false);
        })
        .catch(err => console.error(err));
    }, [id]);

    async function save()
    {
        if(!dirty) return;
        setSaving(true);
        try 
        {
            await fetch(`http://localhost:3000/doc/${id}`, 
            {
                method: "PUT",
                headers: 
                {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, content })
            });
            setDirty(false);
        } 
        catch(error) 
        {
            console.error("Save failed", error);
        } 
        finally 
        {
            setSaving(false);
        }
    }

    useEffect(() => 
    {
        if(!dirty || !autosave) return;
        const timeout=setTimeout(save, 2000);
        return () => clearTimeout(timeout);
    }, [title, content, dirty, autosave]);

    async function handleBack() 
    {
        if(dirty) await save();
        navigate("/doc/all");
    }

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={handleBack} className={styles.backBtn}>← Back</button>

                    {/* Settings Toggle */}
                    <label className={styles.toggle}>
                        <input 
                            type="checkbox" 
                            checked={autosave} 
                            onChange={() => setAutosave(!autosave)} 
                        />
                        Autosave
                    </label>

                    <input
                        className={styles.title}
                        value={title}
                        onChange={(e) => { setTitle(e.target.value); setDirty(true); }}
                    />

                    {/* Manual Save Button */}
                    {!autosave && (
                        <button 
                            onClick={save} 
                            disabled={!dirty || saving}
                            className={styles.saveBtn}
                        >
                            {saving ? "Saving..." : "Save Now"}
                        </button>
                    )}

                    <span className={styles.status}>
                        <span style={{ color: dirty ? '#ed8936' : '#48bb78' }}>●</span> 
                        {dirty ? "Unsaved" : "Saved"}
                    </span>
                    
                </div>

                <textarea
                    className={styles.editor}
                    value={content}
                    onChange={(e) => { setContent(e.target.value); setDirty(true); }}
                />
            </div>
        </Layout>
    );
}

export default Editor;