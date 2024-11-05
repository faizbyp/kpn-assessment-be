import { db } from "@/config/connection";
import { TRANSACTION as TRANS } from "@/config/transaction";
import { updateQuery } from "@/helper/queryBuilder";

interface TermsValues {
  name: string;
}

export const getTermsPP = async () => {};

export const updateTerms = async (payload: TermsValues, id: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = updateQuery("mst_business_unit", payload, { id }, "id");
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