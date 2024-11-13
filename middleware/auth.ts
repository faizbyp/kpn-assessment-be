import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  let token = "";
  if (authHeaders) token = (authHeaders as string).split(" ")[1];
  if (!authHeaders) {
    res.status(403).send({
      message: "Access Denied",
    });
  } else {
    try {
      verify(token, process.env.SECRETJWT as Secret);
      next();
    } catch (error: any) {
      if (error.name === "TokenExpiredError") {
        res.status(401).send({
          message: error.message,
        });
      } else {
        res.status(500).send({
          message: error.stack,
        });
      }
    }
  }
};
