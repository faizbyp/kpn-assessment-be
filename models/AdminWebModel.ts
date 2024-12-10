import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import { accessExpiry, refreshExpiry } from "#dep/constant";
import { createOTP } from "#dep/helper/auth/OTP";
import { hashPassword, validatePassword } from "#dep/helper/auth/password";
import { deleteQuery, insertQuery, updateQuery } from "#dep/helper/queryBuilder";
import { Emailer } from "#dep/services/mail/Emailer";
import { User } from "#dep/types/AdminTypes";
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

export const createAdmin = async (payload: any) => {
  const client = await db.connect();

  try {
    await client.query(TRANS.BEGIN);

    const checkUserExist = await client.query(
      "SELECT * FROM mst_admin_web WHERE username = $1 OR email = $2",
      [payload.username, payload.email]
    );
    if (checkUserExist.rows.length > 0) {
      throw new Error("User already exist");
    }

    const [q, v] = insertQuery("mst_admin_web", payload, "id, role_id");
    const { rows } = await client.query(q, v);

    const { rows: role } = await client.query(
      `
      SELECT role_name FROM mst_role WHERE id = $1
      `,
      [rows[0].role_id]
    );

    await client.query(TRANS.COMMIT);
    return { id: rows[0].id, role: role[0].role_name };
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

export const getRole = async () => {
  const client = await db.connect();

  try {
    await client.query(TRANS.BEGIN);
    const { rows } = await client.query(
      `
      SELECT id, role_name FROM mst_role;
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

export const reqResetPassword = async (email: string) => {
  const client = await db.connect();

  try {
    await client.query(TRANS.BEGIN);
    const checkRegis = await client.query("SELECT * FROM mst_admin_web where email = $1", [email]);
    if (checkRegis.rows.length === 0) {
      throw new Error("User not registered yet");
    }
    const [otpCode, encodedOTP, validUntil] = createOTP();
    const payload = {
      email: email,
      otp_code: encodedOTP,
      valid_until: validUntil,
    };
    const [cleanQuery, cleanValue] = deleteQuery("otp_trans", { email: email });
    await client.query(cleanQuery, cleanValue);
    const [insertOtpQuery, insertOtpValue] = insertQuery("otp_trans", payload);
    await client.query(insertOtpQuery, insertOtpValue);

    const Email = new Emailer();
    const sendOtp = await Email.otpResetPass(otpCode, email);
    console.log(sendOtp);

    await client.query(TRANS.COMMIT);
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};

export const resetPassword = async (newPass: string, email: string) => {
  const client = await db.connect();

  try {
    await client.query(TRANS.BEGIN);
    const checkUser = await client.query("SELECT * FROM mst_admin_web WHERE email = $1", [email]);
    if (checkUser.rows.length == 0) {
      throw new Error("User not found");
    }
    const hashedNewPass = await hashPassword(newPass);
    const payload = {
      password: hashedNewPass,
    };
    const [updatePassQuery, updatePassValue] = updateQuery(
      "mst_admin_web",
      payload,
      { email: email },
      "username"
    );
    await client.query(updatePassQuery, updatePassValue);

    const [cleanQuery, cleanValue] = deleteQuery("otp_trans", { email: email });
    await client.query(cleanQuery, cleanValue);

    await client.query(TRANS.COMMIT);
  } catch (error) {
    await client.query(TRANS.ROLLBACK);
    console.log(error);
    throw error;
  } finally {
    client.release();
  }
};
