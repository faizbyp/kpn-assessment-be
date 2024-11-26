import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import { deleteQuery, insertQuery, updateQuery } from "#dep/helper/queryBuilder";
import { BURequest, QuestionRequest } from "#dep/types/MasterDataTypes";

export const createQuestion = async (payload: QuestionRequest) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = insertQuery("mst_question_answer", payload, "id");
    const result = await client.query(q, v);
    await client.query(TRANS.COMMIT);
    return result.rows[0].id;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

export const getQuestion = async () => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
      SELECT
        q.id, q.q_seq, q.q_layout_type, q.q_input_text, q.q_input_image_url, q.answer_type, a.fullname AS created_by
      FROM mst_question_answer q
      JOIN mst_admin_web a ON q.created_by = a.id
    `
    );
    await client.query(TRANS.COMMIT);
    return result.rows;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

export const getQuestionById = async (id: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
      SELECT
        q.*, a.fullname AS created_by
      FROM mst_question_answer q
      JOIN mst_admin_web a ON q.created_by = a.id
      WHERE q.id = $1
    `,
      [id]
    );
    await client.query(TRANS.COMMIT);
    return result.rows[0];
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};
