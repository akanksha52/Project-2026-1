export function canView(userId, doc) 
{
    if(doc.owner.equals(userId)) return true;
    if(doc.isPublic) return true;
    return doc.collaborators.some(c =>
       c.userId.equals(userId)
    );
}

export function canEdit(userId, doc) 
{
    if(doc.owner.equals(userId)) return true;
    if(doc.isPublic && doc.publicRole==="editor") return true;
    return doc.collaborators.some(c =>
        c.userId.equals(userId) && c.role === "editor"
    );
}