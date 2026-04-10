import mongoose from "mongoose";

const dbName="collab";

async function connectToDB() 
{
    while(true) 
    {
        try 
        {
            await mongoose.connect(`mongodb://127.0.0.1:27017/${dbName}`);
            console.log("DB connected!");
            break;
        } 
        catch(err) 
        {
            console.log(err);
            console.log("Failed to connect. Retrying in 3s...");
            await new Promise(res => setTimeout(res, 3000));
        }
    }
};

export default connectToDB;