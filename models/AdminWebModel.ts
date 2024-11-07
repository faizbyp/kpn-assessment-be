import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import { validatePassword } from "#dep/helper/auth/password";
import { updateQuery } from "#dep/helper/queryBuilder";
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

    const accessToken = sign(
      {
        email: data.email,
        username: data.username,
        fullname: data.fullname,
        id_user: data.id,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: "5m" }
    );

    const refreshToken = sign(
      {
        email: data.email,
        username: data.username,
        fullname: data.fullname,
        id_user: data.id,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: "6h" }
    );

    const [insertToken, valueToken] = updateQuery(
      "mst_admin_web",
      { refresh_token: refreshToken },
      { id: data.id }
    );
    await client.query(insertToken, valueToken);

    await client.query(TRANS.COMMIT);

    if (data) {
      const valid = await validatePassword(password, data.password);
      if (!valid) {
        throw new Error("Invalid Password");
      } else {
        return { data, accessToken };
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

export const getRefreshToken = async (id: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
      SELECT refresh_token FROM mst_admin_web WHERE id = $1
      `,
      [id]
    );
    await client.query(TRANS.COMMIT);

    const refresh_token = result.rows[0].refresh_token;
    return refresh_token;
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};
