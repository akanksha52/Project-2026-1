import jwt from "jsonwebtoken";
const SECRET_KEY=process.env.SECRET_KEY;

function isAuth(req, res, next)
{
    const token=req.cookies.token;
    if(!token) 
    {
        return res.redirect("/login");
    }
    try 
    {
        const decoded=jwt.verify(token, SECRET_KEY);
        req.userId=decoded.userId;
        next();
    } 
    catch(err) 
    {
        return res.redirect("/login");
    }
};

export default isAuth;
