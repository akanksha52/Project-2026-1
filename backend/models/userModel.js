import userSchema from "../schema/userSchema.js";
import mongoose from "mongoose";

const userModel=mongoose.model('user', userSchema);

export default userModel;