import express from "express";
import path from "path";
import mongoose from "mongoose";
import userModel from "./models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

const dbName="collab";

async function connectToDB() 
{
    while(true) 
    {
        try 
        {
            await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
            console.log("DB connected!");
            break;
        } 
        catch(err) 
        {
            console.log(err);
            console.log("Failed to connect. Retrying in 3s...");
            await new Promise(res => setTimeout(res, 3000));
        }
    }
};

connectToDB();

const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(cookieParser());

function isAuth(req, res, next)
{
    const token=req.cookies.token;
    if(!token) 
    {
        return res.redirect("/login");
    }
    try 
    {
        const decoded=jwt.verify(token, SECRET_KEY);
        req.userId=decoded.userId;
        next();
    } 
    catch(err) 
    {
        return res.redirect("/login");
    }
};

app.get("/", isAuth, (req, res) =>
{
    res.send("Home page!");
});

app.get("/login", (req, res) =>
{
    res.render("1_login.ejs");
});

app.post("/login", async (req, res) =>
{
    let {field, password}=req.body;
    if(!field || !password)
    {
        return res.send("Failed to login!")
    }
    let result;
    if(field.includes("@"))
    {
        result=await userModel.findOne({email: field});
    }
    else
    {
        result=await userModel.findOne({phone: field});
    }
    if(!result)
    {
        return res.send("You are not registered!");
    }
    const isMatch=await argon2.verify(result.password, password);
    if(!isMatch)
    {
        return res.send("Wrong password!");
    }
    const token=jwt.sign({userId: result._id}, SECRET_KEY, {expiresIn:"1h"});
    res.cookie("token", token, {httpOnly:true});
    res.redirect("/");
});

app.get("/signup", (req, res) =>
{
    res.render("2_signup.ejs");
});

app.post("/signup", async (req, res) =>
{
    const {email, phone, password}=req.body;
    if(!email || !phone || !password)
    {
        return res.send("Failed to signup!")
    }
    const hashedPassword=await argon2.hash(password);
    const result=await userModel.create({email: email, phone: phone, password: hashedPassword});
    if(!result)
    {
        return res.send("Email or phone already register!");
    }
    res.redirect("/");
});

app.get("/logout", (req, res) => 
{
    res.clearCookie("token");
    res.redirect("/login");
});

app.listen(3000);