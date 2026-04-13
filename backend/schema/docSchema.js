import mongoose from "mongoose";

const docSchema=new mongoose.Schema(
{
    title: 
    {
        type: String,
        required: true, 
        trim: true,
        lowercase: true
    },
    content: 
    {
        type: String,
        default: ""
    },
    isStarred: 
    {
        type: Boolean,
        default: false   
    },
    owner:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true
    }},
    {timestamps: true}
);

docSchema.index({ owner: 1, title: 1 }, { unique: true });

export default docSchema;