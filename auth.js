import express from "express";
import path from "path";
import mongoose from "mongoose";
import userModel from "./models/userModel.js";

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

app.get("/", (req, res) =>
{
    res.send("Home page!");
})

app.get("/login", (req, res) =>
{
    res.render("1_login.ejs");
});

app.post("/login", async (req, res) =>
{
    const {field, password}=req.body;
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
    if(password!=result.password)
    {
        return res.send("Wrong password!");
    }
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
        return res.send("Failed to login!")
    }
    const result=await userModel.insertOne({email: email, phone: phone, password: password});
    if(!result)
    {
        return res.send("Email or phone already register!");
    }
    res.redirect("/");
});


app.listen(3000);