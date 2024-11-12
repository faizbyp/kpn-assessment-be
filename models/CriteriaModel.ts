import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import { deleteQuery, insertQuery, updateQuery } from "#dep/helper/queryBuilder";
import { Criteria, CriteriaGroup } from "#dep/types/CriteriaTypes";

export const createCriteria = async (groupPayload: CriteriaGroup, criteriaPayload: Criteria) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);

    const [groupQ, groupV] = insertQuery("mst_value", groupPayload, "value_name");
    const groupResult = await client.query(groupQ, groupV);
    const [criteriaQ, criteriaV] = insertQuery("mst_criteria", criteriaPayload, "criteria_name");
    const criteriaResult = await client.query(criteriaQ, criteriaV);

    await client.query(TRANS.COMMIT);
    return groupResult.rows[0].value_name;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

export const getCriteria = async () => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
    SELECT cr.*, v.value_code, v.value_name, v.id AS value_id
    FROM mst_criteria cr
    JOIN mst_value v ON cr.category_fk = v.id
    ORDER BY cr.minimum_score ASC
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

export const deleteCriteria = async (id: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
      DELETE FROM mst_criteria WHERE category_fk = $1
      `,
      [id]
    );
    const categoryResult = await client.query(
      `
      DELETE FROM mst_value WHERE id = $1 RETURNING value_name
      `,
      [id]
    );
    if (result.rowCount === 0 || categoryResult.rowCount === 0) {
      throw new Error(`ID ${id} not exist`);
    }
    await client.query(TRANS.COMMIT);
    console.log(categoryResult);
    return categoryResult.rows[0].value_name;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};
