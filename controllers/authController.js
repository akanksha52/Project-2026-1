import userModel from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

export const home=(req, res) => 
{
    res.send("Home page!");
};

export const getLogin=(req, res) => 
{
    res.render("1_login.ejs");
};

export const postLogin=async (req, res) => 
{
    let {field, password}=req.body;

    if (!field || !password)
        return res.send("Failed to login!");

    let user=field.includes("@")
        ? await userModel.findOne({ email: field })
        : await userModel.findOne({ phone: field });

    if(!user) return res.send("Not registered!");

    const isMatch=await argon2.verify(user.password, password);
    if(!isMatch) return res.send("Wrong password!");

    const token=jwt.sign({ userId: user._id }, SECRET_KEY, {
        expiresIn: "1h",
    });

    res.cookie("token", token, { httpOnly: true });
    res.redirect("/");
};

export const getSignup=(req, res) => 
{
    res.render("2_signup.ejs");
};

export const postSignup=async (req, res) => 
{
    const {email, phone, password}=req.body;

    if(!email || !phone || !password)
        return res.send("Failed to signup!");

    const hashedPassword=await argon2.hash(password);

    try {
        await userModel.create({ email, phone, password: hashedPassword });
        res.redirect("/");
    } catch {
        res.send("User already exists!");
    }
};

export const logout=(req, res) => 
{
    res.clearCookie("token");
    res.redirect("/auth/login");
};