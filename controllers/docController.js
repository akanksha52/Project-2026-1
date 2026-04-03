import express from "express";
import docModel from "../models/docModel.js";

const router=express.Router();

export const getAll=async (req, res) => 
{
    try
    {
        const page=parseInt(req,Query.page) || 1;
        const lim=10;
        const docs=await docModel.find({owner: req.userId})
                        .select("title createdAt updatedAt")
                        .skip((page-1)*limit)
                        .limit(limit)
                        .sort({updatedAt: -1});
        res.json(doc);
    }
    catch(err)
    {
        res.status(500).send("Error fetching documents");
    }
};

export const getById=async (req, res) =>
{
    const doc=await docModel.findById(req.params.id);
    if(!doc) return res.send("Document not found!");
    if(doc.owner.toString()!=req.userId) return res.send("Unauthorised");
    res.json(doc);
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
        if(err.code==11000) return res.send("Title already exists");
        return res.send("Error creating document");
    }
}

export const putDocById=async (req, res) =>
{
    const {content , title}=req.body;
    const doc=await docModel.findById(req.params.id);
    if(!doc) return res.send("Document not found");
    if(doc.owner.toString!=req.userId) return res.send("Unauthorised");
    if(content!=undefined) doc.content=content;
    if(title!=undefined) doc.title=title;
    await doc.save();
    res.send("Updated");
}

export const deleteDocById=async (req, res) =>
{
    const doc=await docModel.findById(req.params.id);
    if(!doc) return res.send("Document not found");
    if(doc.owner.toString!=req.userId) return res.send("Unauthorised");
    await doc.deleteOne();
    res.send("Deleted");
}