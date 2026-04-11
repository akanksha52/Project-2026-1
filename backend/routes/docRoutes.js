import express from "express";
import {
    home,
    getAll,
    getById,
    createDoc,
    putDocById,
    deleteDocById
} from "../controllers/docController.js";
import isAuth from "../middleware/isAuth.js";

const router=express.Router();

router.get("/all", isAuth, getAll);
router.post("/", isAuth, createDoc);
router.get("/:id", isAuth, getById);
router.put("/:id", isAuth, putDocById);
router.delete("/:id", isAuth, deleteDocById);

export default router;