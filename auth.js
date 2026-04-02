import express from "express";
import path from "path";
import mongoose from "mongoose";

async function connectToDB()
{
    while(true)
    {
        await mongoose.connect('mongodb://127.0.0.1:27017/test').then()
        {
            console.log("DB connected!");
            return;
        }.catch(err)
        {
            console.log("Failed to connect to DB");
        };
    }
}

const Cat = mongoose.model('Cat', { name: String });


const app=express();

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/login", (req, res) =>
{
    res.render("1_login.ejs");
});

app.get("/signup", (req, res) =>
{
    res.render("2_signup.ejs");
});


app.listen(3000);