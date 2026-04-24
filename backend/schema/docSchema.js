import mongoose from "mongoose";

const docSchema=new mongoose.Schema(
    {title: 
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
    },
    collaborators: 
    [
        {
            userId: 
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user"
            },
            role: 
            {
                type: String,
                enum: ["viewer", "editor"],
                default: "viewer"
            }
        }
    ],
    isPublic: 
    {
        type: Boolean,
        default: false
    },
    publicRole: 
    {
        type: String,
        enum: ["viewer", "editor"],
        default: "viewer"
    }},
    {timestamps: true}
);

docSchema.index({ owner: 1, title: 1 }, { unique: true });

export default docSchema;



