import express from "express";
import docModel from "../models/docModel.js";

const router=express.Router();

export const getAll=async (req, res) => 
{
    try
    {
        const page=parseInt(req.query.page) || 1;
        const lim=10;
        const docs=await docModel.find({owner: req.userId})
                        .select("title createdAt updatedAt")
                        .skip((page-1)*lim)
                        .limit(lim)
                        .sort({updatedAt: -1});
        res.json(docs);
    }
    catch(err)
    {
        res.status(500).json({message: "Error fetching documents"});
    }
};

export const getById=async (req, res) =>
{
    try
    {
        const doc=await docModel.findById(req.params.id);
        if(!doc) return res.json({message: "Document not found!"});
        if(doc.owner.toString()!==req.userId) return res.json({message: "Unauthorised"});
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
}

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
}

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
}