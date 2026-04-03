import docSchema from "../schema/docSchema.js";
import mongoose from "mongoose";

const docModel=mongoose.model('doc', docSchema);

export default docModel;