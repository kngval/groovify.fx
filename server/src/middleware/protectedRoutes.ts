import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

const jwt_secret = process.env.JWT_SECRET as string;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
type User = {
  id: string;
  email: string;
  display_name: string;
};
export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];

    jwt.verify(token, jwt_secret, (err, decoded) => {
      if (err) {
        return res.status(403);
      }

      req.user = decoded as User;
      console.log(req.user);
      next();
    });
  } else {
    return res.status(401);
  }
};
