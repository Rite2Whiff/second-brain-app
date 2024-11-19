import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "./config";

interface CustomRequest extends Request {
  userId: string;
  headers: {
    token: string;
  };
}

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.token;
  const decoded = jwt.verify(token as string, JWT_SECRET);

  if (!decoded) {
    res.json({
      message: "user not found in our database",
    });
  } else {
    req.userId = (decoded as JwtPayload).id;
    next();
  }
}
