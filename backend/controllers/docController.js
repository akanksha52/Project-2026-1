import express from "express";
import userModel from "../models/userModel.js";
import docModel from "../models/docModel.js";

const router=express.Router();

const SECRET_KEY=process.env.SECRET_KEY;

export const home=(req, res) =>
{
    console.log("Home");
};

export const getAll=async (req, res) => 
{
    try
    {
        const docs=await docModel.find({ owner: req.userId }).select("title createdAt updatedAt");
        const user=await userModel.findById(req.userId);
        const starredSet=new Set((user.starredDocs || []).map(id => id.toString()));
        const docsWithStar=docs.map(doc => ({
            ...doc.toObject(),
            isStarred: starredSet.has(doc._id.toString())
        }));
        res.json(docsWithStar);
    }
    catch(err)
    {
        res.status(500).json({ message: "Error fetching documents" });
    }
};

export const getById=async (req, res) =>
{
    try
    {
        const user=await userModel.findById(req.userId);
        const doc=await docModel.findById(req.params.id);
        if(!doc) return res.json({message: "Document not found!"});
        if(doc.owner.toString()!==req.userId) return res.json({message: "Unauthorised"});
        user.recentDoc=doc._id;
        await user.save();
        console.log(user);
        res.json(doc); 
    }
    catch(e)
    {
        return res.status(500).json({message: "Some error occured"});
    }
};

export const createDoc=async (req, res) =>
{
    const {title}=req.body;
    try
    {
        const doc=await docModel.create({title: title, owner: req.userId});
        res.json(doc);
    }
    catch(err)
    {
        if(err.code==11000) return res.send({message: "Title already exists"});
        return res.json({message: "Error creating document"});
    }
};

export const putDocById=async (req, res) =>
{
    try
    {
        const {content , title}=req.body;
        const doc=await docModel.findById(req.params.id);
        if(!doc) return res.status(404).json({ message: "Document not found" })
        if(doc.owner.toString()!==req.userId) return res.json({message: "Unauthorised"});
        if(content!=undefined) doc.content=content;
        if(title!=undefined) doc.title=title;
        await doc.save();
        res.json({message: "Updated"}); 
    }
    catch(err)
    {
        return res.status(500).json({message: "Some error occured"});
    }
};

export const deleteDocById=async (req, res) =>
{
    try
    {
        const doc=await docModel.findById(req.params.id);
        if(!doc) return res.status(404).json({ message: "Document not found" })
        if(doc.owner.toString()!==req.userId) return res.json({message: "Unauthorised"});
        await doc.deleteOne();
        res.json({message: "Deleted"});
    }
    catch(err)
    {
        return res.status(500).json({message: "Some error occured"});
    }
};

export const starToggle=async (req, res) =>
{
    try
    {
        const user=await userModel.findById(req.userId);
        const docId=req.params.id;
        if(user.starredDocs.includes(docId)) user.starredDocs=user.starredDocs.filter((id) => id.toString()!==docId);
        else user.starredDocs.push(docId);
        await user.save();
        res.json({ message: "Toggled star" });
    }
    catch(err) 
    {
        res.status(500).json({ message: "Error toggling star" });
    }
};

export const getStarred=async (req, res) => 
{
    try 
    {
        const user=await userModel.findById(req.userId).populate("starredDocs", "title updatedAt");
        res.json(user.starredDocs);
    } 
    catch(err) 
    {
        res.status(500).json({ message: "Error fetching starred docs" });
    }
};

export const getRecent = async (req, res) => 
{
    try 
    {
        const user = await userModel.findById(req.userId);
        if(!user || !user.recentDoc) 
        {
            console.log("No recentDoc found on user object");
            return res.json({ message: "You have no recent document!" });
        }
        const doc=await docModel.findById(user.recentDoc);
        if(!doc) 
        {
            console.log("Document ID exists in User, but Document is missing from DB");
            return res.json({ message: "Recent document was deleted!" });
        }
        if(!doc.owner.equals(req.userId)) 
        {
            console.log("Ownership mismatch!");
            return res.status(403).json({ message: "Unauthorised" });
        }
        console.log("Success! Sending docId");
        res.json({ docId: doc._id });
    } 
    catch(e) 
    {
        console.error("GET RECENT ERROR:", e);
        res.status(500).json({ message: "Server error" });
    }
};