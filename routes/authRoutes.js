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

router.get("/auth/login", getLogin);
router.post("/auth/login", postLogin);

router.get("/auth/signup", getSignup);
router.post("/auth/signup", postSignup);

router.get("/auth/logout", logout);

export default router;