import express from "express";
import { loginRedirect, callback, refreshAccessToken } from "../controllers/loginRedirect";
import { authenticateToken } from "../middleware/protectedRoutes";

const router = express.Router();

router.get("/login", loginRedirect);
router.get("/callback", callback);
router.get("/refresh-token",authenticateToken,refreshAccessToken)

export default router;
