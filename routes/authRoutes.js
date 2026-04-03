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

router.get("/login", getLogin);
router.post("/login", postLogin);

router.get("/signup", getSignup);
router.post("/signup", postSignup);

router.get("/logout", logout);

export default router;