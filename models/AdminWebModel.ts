import { db } from "@/config/connection";
import { TRANSACTION as TRANS } from "@/config/transaction";
import { validatePassword } from "@/helper/auth/password";
import { Secret, sign } from "jsonwebtoken";

export const loginAdmin = async (emailOrUname: string, password: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const checkUserData = await client.query(
      "SELECT * FROM mst_admin_web WHERE username = $1 OR email = $1",
      [emailOrUname]
    );
    if (checkUserData.rows.length === 0) {
      throw new Error("User Not Found");
    }
    const data = checkUserData.rows[0];
    await client.query(TRANS.COMMIT);
    const refreshToken = sign(
      {
        email: data.email,
        username: data.username,
        name: data.name,
        id_user: data.id_user,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: "6h" }
    );
    const accessToken = sign(
      {
        email: data.email,
        username: data.username,
        name: data.name,
        id_user: data.id_user,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: "5m" }
    );
    if (data) {
      const valid = await validatePassword(password, data.password);
      if (!valid) {
        throw new Error("Invalid Password");
      } else {
        return { data, accessToken, refreshToken };
      }
    } else {
      throw new Error("User Not Found");
    }
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};
