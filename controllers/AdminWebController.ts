import { loginAdmin } from "@/models/AdminWebModel";
import { Request, Response } from "express";

export const handleLoginAdmin = async (req: Request, res: Response): Promise<any> => {
  const emailOrUname = req.body.username;
  const password = req.body.password;
  try {
    const { data, accessToken, refreshToken } = await loginAdmin(emailOrUname, password);
    res.status(200).send({
      message: `Success sign in, welcome ${data.fullname}`,
      data: {
        name: data.name,
        username: data.username,
        email: data.email,
        id_user: data.id_user,
        id_role: data.id_role,
        accessToken: accessToken,
        refreshToken: refreshToken,
      },
    });
  } catch (error: any) {
    if (error.message === "Invalid Password" || error.message === "User Not Found") {
      return res.status(400).send({ message: error.message });
    }
    res.status(500).send({ message: error.message });
  }
};
