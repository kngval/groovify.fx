import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types/types";
const jwt_secret = process.env.JWT_SECRET as string;

import dotenv from "dotenv";
dotenv.config();

declare global {
  namespace Express {
    interface Request {
      user: User;
      // spotifyUser :
    }
  }
}

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader && authHeader.startsWith("Bearer")) {
    const token = authHeader.split(" ")[1];
    if (token) {
      jwt.verify(token, jwt_secret, (err) => {
        if (err) {
          return res.status(403).json({ error: "Forbidden" });
        }
        next();
      });
    } else {
      return res.status(400).json({ error: "No token present" });
    }
  } else {
    return res.status(401).json({ error: "Invalid Auth Header" });
  }
};
