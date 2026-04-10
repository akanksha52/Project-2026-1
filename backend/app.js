import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import docRoutes from "./routes/docRoutes.js"
import connectToDB from "./config/db.js";
import isAuth from "./middleware/isAuth.js";
import cors from "cors";

dotenv.config();

const app=express();

app.use(cors(
{
    origin: "http://localhost:5173",
    credentials: true
}));

connectToDB();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.set("view engine", "ejs");

app.get("/", isAuth, (req, res) =>
{
    res.json({message: "Home"});
});

app.use("/auth", authRoutes);

app.use("/doc", docRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});