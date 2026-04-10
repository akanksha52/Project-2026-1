import userModel from "../models/userModel.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY=process.env.SECRET_KEY;

export const home=(req, res) => 
{
    res.json({ message: "API is working" });
};

export const getLogin=(req, res) => 
{
    res.json({message: "Login page"});
};

export const postLogin=async (req, res) => 
{
    try
    {
        let {field, password}=req.body;

        if (!field || !password)
            return res.json({message: "Failed to login!"});

        let user=field.includes("@")
            ? await userModel.findOne({ email: field })
            : await userModel.findOne({ phone: field });

        if(!user) return res.status(404).json({ message: "User not found" });

        const isMatch=await argon2.verify(user.password, password);
        if(!isMatch) return res.status(401).json({ message: "Wrong password" });

        const token=jwt.sign({ userId: user._id }, SECRET_KEY, {
            expiresIn: "1h",
        });

        res.cookie("token", token, { httpOnly: true });
        return res.status(200).json({message: "Login successful", token, user: {id: user._id, email: user.email, phone: user.phone}});
    }
    catch(e)
    {
        res.json({message: "Failed to login!"})
    }
};

export const getSignup=(req, res) => 
{
    res.render("2_signup.ejs");
};

export const postSignup=async (req, res) => 
{
    const {email, phone, password}=req.body;
    if(!email || !phone || !password) return res.status(400).json({ message: "All fields required" });
    const hashedPassword=await argon2.hash(password);
    try 
    {
        const newUser=await userModel.create({
            email,
            phone,
            password: hashedPassword
        });
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: newUser._id,
                email: newUser.email,
                phone: newUser.phone
            }
        });
    } 
    catch 
    {
        return res.status(400).json({ message: "User already exists" });
    }
};

export const logout=(req, res) => 
{
    res.clearCookie("token");
    return res.status(200).json({ message: "Logged out successfully" });
};