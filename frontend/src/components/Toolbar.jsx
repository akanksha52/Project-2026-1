import React from 'react';
import styles from "./../pages/Editor.module.css";

function Toolbar({ editor }) {
    if (!editor) return null;

    return (
        <div className={styles.toolbar}>
            <button 
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? styles.activeBtn : styles.toolBtn}
            >
                <b>B</b>
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? styles.activeBtn : styles.toolBtn}
            >
                <i>I</i>
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? styles.activeBtn : styles.toolBtn}
            >
                H1
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? styles.activeBtn : styles.toolBtn}
            >
                H2
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleBulletList().run()}
                className={editor.isActive('bulletList') ? styles.activeBtn : styles.toolBtn}
            >
                • List
            </button>

            <button 
                onClick={() => editor.chain().focus().toggleCodeBlock().run()}
                className={editor.isActive('codeBlock') ? styles.activeBtn : styles.toolBtn}
            >
                {"</>"}
            </button>
            
            <button 
                onClick={() => editor.chain().focus().undo().run()}
                disabled={!editor.can().undo()}
                className={styles.toolBtn}
            >
                ↶
            </button>

            <button 
                onClick={() => editor.chain().focus().redo().run()}
                disabled={!editor.can().redo()}
                className={styles.toolBtn}
            >
                ↷
            </button>
        </div>
    );
}

export default Toolbar;