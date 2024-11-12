import { getRefreshToken, loginAdmin } from "#dep/models/AdminWebModel";
import { Request, Response } from "express";
import { Secret, sign } from "jsonwebtoken";

export const handleLoginAdmin = async (req: Request, res: Response): Promise<any> => {
  const emailOrUname = req.body.username;
  const password = req.body.password;
  try {
    const { data, accessToken } = await loginAdmin(emailOrUname, password);
    res.status(200).send({
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
    res.status(500).send({ message: error.message });
  }
};

export const refreshAccessToken = async (req: Request, res: Response) => {
  const user_id = req.body.user_id;
  try {
    const token = getRefreshToken(user_id);
    res.status(200).send({
      access_token: token,
    });
  } catch (error: any) {
    res.status(500).send({
      message: error.message,
    });
  }
};
