import { hashPassword } from "#dep/helper/auth/password";
import {
  createAdmin,
  getAllAdmin,
  getNewToken,
  getRole,
  loginAdmin,
} from "#dep/models/AdminWebModel";
import { Emailer } from "#dep/services/mail/Emailer";
import { User } from "#dep/types/AdminTypes";
import { Request, Response } from "express";
import { Secret, sign } from "jsonwebtoken";
import { v4 as uuidv4 } from "uuid";

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

export const handleGetAllAdmin = async (_req: Request, res: Response) => {
  try {
    let result = await getAllAdmin();
    res.status(200).send({
      message: `Success get admin accounts`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleGetRole = async (_req: Request, res: Response) => {
  try {
    let result = await getRole();
    res.status(200).send({
      message: `Success get role`,
      data: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};

export const handleCreateAdmin = async (req: Request, res: Response) => {
  const today = new Date();
  const data = req.body;
  const password =
    (process.env.DEFAULT_PASS as string) + Math.floor(1000 + Math.random() * 9000).toString();
  const hashed = await hashPassword(password);

  const payload = {
    id: uuidv4(),
    fullname: data.fullname,
    username: data.username,
    email: data.email,
    password: hashed,
    role_id: data.role_id,
    is_active: data.is_active,
    created_by: data.created_by,
    created_date: today,
  };

  try {
    let result = await createAdmin(payload);

    const emailData = {
      fullname: data.fullname,
      username: data.username,
      password: password,
      role: result.role,
    };

    const Email = new Emailer();
    await Email.newAccount(emailData, data.email);

    res.status(200).send({
      message: `Success create admin`,
      id: result,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
