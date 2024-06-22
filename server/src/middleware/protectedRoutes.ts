import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { User } from "../types";
const jwt_secret = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        display_name: string;
        accessToken: string;
      };
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
      jwt.verify(token, jwt_secret, (err, decoded) => {
        if (err) {
          return res.status(403);
        }
        req.user = decoded as User;
        next();
      });
    } else {
      return res.status(400).json({ error: "No token present" });
    }
  } else {
    return res.status(401).json({ error: "Invalid Auth Header" });
  }
};
