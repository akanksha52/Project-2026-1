import docModel from "../models/docModel.js";

const router=express.Router();

export const getAll=async (req, res) => {
    try
    {
        const page=parseInt(req,Query.page) || 1;
        const lim=10;
        const docs=await docModel.find({owner: req.userId})
                        .select("title createdAt updatedAt")
                        .skip((page-1)*limit)
                        .limit(limit)
                        .sort({updatedAt: -1});
        res.json(doc);
    }
    catch(err)
    {
        res.status(500).send("Error fetching documents");
    }
};

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/logout", logout);

export default router;