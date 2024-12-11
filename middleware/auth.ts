import { TokenPayload } from "#dep/types/AdminTypes";
import { NextFunction, Request, Response } from "express";
import { Secret, verify } from "jsonwebtoken";

export const isAuth = (req: Request, res: Response, next: NextFunction): any => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  let token = "";
  if (authHeaders) token = (authHeaders as string).split(" ")[1];
  if (!authHeaders) {
    return res.status(403).send({
      message: "Access Denied",
    });
  }

  try {
    const userDecode = verify(token, process.env.SECRETJWT as Secret);
    req.userDecode = userDecode as TokenPayload;
    return next();
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).send({
        message: error.message,
      });
    } else {
      return res.status(500).send({
        message: error.stack,
      });
    }
  }
};

export const checkPermission =
  (action: "fcreate" | "fread" | "fupdate" | "fdelete", pageId: number) =>
  (req: Request, res: Response, next: NextFunction): any => {
    const permission = req.userDecode?.permission;

    if (!permission) throw new Error("Permission not provided");

    const pagePermission = permission.find((perm: any) => Number(perm.page_id) === pageId);

    if (pagePermission && pagePermission[action]) {
      return next();
    }
    return res.status(403).send({ message: "Forbidden" });
  };
