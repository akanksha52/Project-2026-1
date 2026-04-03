import express from "express";
import {
    home,
    getLogin,
    postLogin,
    getSignup,
    postSignup,
    logout
} from "../controllers/authController.js";
import isAuth from "../middleware/isAuth.js";

const router=express.Router();

router.get("/all", isAuth, getLogin);
router.get("/:id", isAuth, getLogin);

router.get("/create", isAuth, getSignup);
router.post("/create", isAuth, postSignup);

router.put("/:id", isAuth, logout);
router.put("/delete", isAuth, logout);

export default router;