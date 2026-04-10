import express from "express";
import {
    getAll,
    getById,
    createDoc,
    putDocById,
    deleteDocById
} from "../controllers/docController.js";
import isAuth from "../middleware/isAuth.js";

const router=express.Router();

router.get("/all", isAuth, getAll);
router.get("/:id", isAuth, getById);
router.get("/create", isAuth, createDoc);
router.put("/:id", isAuth, putDocById);
router.put("/delete", isAuth, deleteDocById);

export default router;