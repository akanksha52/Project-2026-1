import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import connectToDB from "./config/db.js";
import isAuth from "./middleware/isAuth.js";

dotenv.config();

const app=express();

connectToDB();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", isAuth, (req, res) =>
{
    res.send("home");
});

app.use("/auth", authRoutes);


app.listen(3000, () => {
    console.log("Server running on port 3000");
});