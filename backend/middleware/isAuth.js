import jwt from "jsonwebtoken";

function isAuth(req, res, next) 
{
    const authHeader=req.headers.authorization;
    if(!authHeader) 
    {
        return res.status(401).json({ message: "No token" });
    }
    const token=authHeader.split(" ")[1]; 
    try 
    {
        const decoded=jwt.verify(token, process.env.SECRET_KEY);
        req.userId=decoded.userId;
        next();
    } 
    catch (err) 
    {
        return res.status(401).json({ message: "Invalid token" });
    }
}

export default isAuth;