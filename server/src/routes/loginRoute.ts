import express from "express";
import { loginRedirect, callback, greet } from "../controllers/loginRedirect";
import { refreshAccessToken } from "../controllers/refreshToken.controller";
import { authenticateToken } from "../middleware/protectedRoutes";
const router = express.Router();

router.get("/login", loginRedirect);
router.get("/callback", callback);
router.post("/refresh_token", authenticateToken, refreshAccessToken);
router.get("/greet", greet);
export default router;
