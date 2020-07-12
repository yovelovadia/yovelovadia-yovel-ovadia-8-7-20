import express, { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
dotenv.config();

const checkJWT = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: any = req.headers.authorization?.split(" ")[1];
    const secret: any = process.env.JWT_KEY;
    const decoded: string | object = jwt.verify(token, secret);
    (<any>req).decoded = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "unAutorized" });
  }
};

export default checkJWT;
