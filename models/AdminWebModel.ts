import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import { accessExpiry, refreshExpiry } from "#dep/constant";
import { validatePassword } from "#dep/helper/auth/password";
import { updateQuery } from "#dep/helper/queryBuilder";
import { User } from "#dep/types/AuthTypes";
import { Secret, sign, verify } from "jsonwebtoken";

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
        user_id: data.id,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: accessExpiry }
    );

    const refreshToken = sign(
      {
        email: data.email,
        username: data.username,
        fullname: data.fullname,
        user_id: data.id,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: refreshExpiry }
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

export const getNewToken = async (data: User) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
      SELECT refresh_token FROM mst_admin_web WHERE id = $1
      `,
      [data.user_id]
    );
    const refreshToken = result.rows[0].refresh_token;

    verify(refreshToken, process.env.SECRETJWT as Secret);
    // If error, error.name === "TokenExpiredError"

    const newToken = sign(
      {
        email: data.email,
        username: data.username,
        fullname: data.fullname,
        user_id: data.user_id,
      },
      process.env.SECRETJWT as Secret,
      { expiresIn: accessExpiry }
    );

    await client.query(TRANS.COMMIT);
    return newToken;
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

export const getAllAdmin = async () => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const { rows } = await client.query(
      `
      SELECT a.username, a.fullname, a.email, a.is_active, r.role_name
      FROM mst_admin_web a
      LEFT JOIN mst_role r ON a.role_id = r.id
      `
    );

    await client.query(TRANS.COMMIT);
    return rows;
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};

export const createAdmin = async () => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const { rows } = await client.query(
      `
      SELECT a.username, a.fullname, a.email, a.is_active, r.role_name
      FROM mst_admin_web a
      LEFT JOIN mst_role r ON a.role_id = r.id
      `
    );

    await client.query(TRANS.COMMIT);
    return rows;
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.error(error);
    throw error;
  } finally {
    client.release();
  }
};
