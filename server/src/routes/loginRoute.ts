import express from "express";
import { loginRedirect, callback } from "../controllers/loginRedirect";

const router = express.Router();

router.get("/login", loginRedirect);
router.get("/callback", callback);

export default router;
