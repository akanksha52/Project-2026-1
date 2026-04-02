import express from "express";
import { encode } from "node:punycode";

const app=express();

app.use(express.urlencoded({extended: true}));
app.uzse("view engine", "ejs");

app.get("/login", (req, res) =>
{
    res.render("1_login.ejs");
});

app.listen(3000);