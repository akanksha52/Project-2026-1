import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import styles from "./Editor.module.css";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Toolbar from "../components/Toolbar";

function Editor() 
{
    const { id }=useParams();
    const navigate=useNavigate();
    const [title, setTitle]=useState("");
    const [content, setContent]=useState("");
    const [saving, setSaving]=useState(false);
    const [dirty, setDirty]=useState(false);
    const [autosave, setAutosave]=useState(false);

    const editor=useEditor({
        extensions: [StarterKit],
        content: "",
        onUpdate: ({editor}) => 
        {
            const html=editor.getHTML();
            setContent(html);
            setDirty(true);
        }
    });

    useEffect(() => 
    {
        fetch(`http://localhost:3000/doc/${id}`, 
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => res.json())
        .then(data => 
        {
            setTitle(data.title || "");
            setContent(data.content || "");
            editor?.commands.setContent(data.content);
            setDirty(false);
        })
        .catch(err => console.error("Fetch error:", err));
    }, [id]);

    async function save() 
    {
        if (!dirty) return;
        setSaving(true);
        try 
        {
            await fetch(`http://localhost:3000/doc/${id}`, 
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify({ title, content })
            });
            setDirty(false);
        } 
        catch (error) 
        {
            console.error("Save failed:", error);
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

    const handleBack=async () => 
    {
        if(dirty) await save();
        navigate("/doc/all");
    };

    return (
        <Layout>
            <div className={styles.container}>
                <div className={styles.header}>
                    <button onClick={handleBack} className={styles.backBtn}>← Back</button>

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
                        placeholder="Document Title"
                    />

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
                
                <Toolbar editor={editor} />

                <div className={styles.editorWrapper}>
                    <EditorContent editor={editor} className={styles.tiptap}/>
                </div>
            </div>
        </Layout>
    );
}

export default Editor;