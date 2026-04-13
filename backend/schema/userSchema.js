import mongoose from "mongoose";

const userSchema=new mongoose.Schema(
{
    email: 
    {
        type: String,
        required: true,
        unique: true
    },
    phone: 
    {
        type: String,
        required: true,
        unique: true
    },
    password: 
    {
        type: String,
        required: true
    },
    starredDocs: 
    [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "doc"
        }
    ],
    recentDoc: 
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "doc"
    }
});

export default userSchema;