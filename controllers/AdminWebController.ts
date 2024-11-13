import { getNewToken, loginAdmin } from "#dep/models/AdminWebModel";
import { User } from "#dep/types/AuthTypes";
import { Request, Response } from "express";
import { Secret, sign } from "jsonwebtoken";

export const handleLoginAdmin = async (req: Request, res: Response): Promise<any> => {
  const emailOrUname = req.body.username;
  const password = req.body.password;
  try {
    const { data, accessToken } = await loginAdmin(emailOrUname, password);
    return res.status(200).send({
      message: `Success sign in, welcome ${data.fullname}`,
      data: {
        fullname: data.fullname,
        username: data.username,
        email: data.email,
        user_id: data.id,
        access_token: accessToken,
      },
    });
  } catch (error: any) {
    if (error.message === "Invalid Password" || error.message === "User Not Found") {
      return res.status(400).send({ message: error.message });
    }
    return res.status(500).send({ message: error.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response): Promise<any> => {
  const authHeaders = req.headers.Authorization || req.headers.authorization;
  if (!authHeaders) {
    res.status(403).send({
      message: "Access Denied",
    });
  }

  const payload: User = {
    user_id: req.body.user_id,
    username: req.body.username,
    fullname: req.body.fullname,
    email: req.body.email,
  };

  try {
    const token = await getNewToken(payload);
    return res.status(200).send({
      access_token: token,
    });
  } catch (error: any) {
    if (error.name === "TokenExpiredError") {
      return res.status(403).send({ message: "Refresh Token Expired. Logging out." });
    }
    return res.status(500).send({
      message: error.message,
    });
  }
};
