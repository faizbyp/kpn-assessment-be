import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";
import {
  deleteQuery,
  insertQuery,
  updateCriteriaQuery,
  updateQuery,
} from "#dep/helper/queryBuilder";
import { Criteria, CriteriaGroup } from "#dep/types/MasterDataTypes";

export const createCriteria = async (groupPayload: CriteriaGroup, criteriaPayload: Criteria[]) => {
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

export const updateCriteria = async (
  payload: CriteriaGroup,
  newCriteria: Criteria[],
  id: string
) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);

    // UPDATE CATEGORY
    const [groupQ, groupV] = updateQuery("mst_value", payload, { id: id }, "value_name");
    const groupResult = await client.query(groupQ, groupV);

    // DELETE PREV CRITERIA
    const [deleteCriteriaQ, deleteCriteriaV] = deleteQuery("mst_criteria", {
      category_fk: id,
    });
    await client.query(deleteCriteriaQ, deleteCriteriaV);

    // ADD NEW CRITERIA
    const [insertCriteriaQ, insertCriteriaV] = insertQuery("mst_criteria", newCriteria);
    await client.query(insertCriteriaQ, insertCriteriaV);

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

// export const updateCriteria1 = async (
//   payload: CriteriaGroup,
//   addedCriteria: Criteria[],
//   editedCriteria: Criteria[],
//   deletedCriteria: Criteria[]
// ) => {
//   const client = await db.connect();
//   try {
//     await client.query(TRANS.BEGIN);

//     // UPDATE CATEGORY QUERY
//     const [groupQ, groupV] = updateQuery("mst_value", payload, { id: payload.id }, "value_name");

//     // ADD CRITERIA QUERY
//     const [insertCriteriaQ, insertCriteriaV] = insertQuery("mst_criteria", addedCriteria);

//     // UPDATE CRITERIA QUERY
//     const updateCriteriaQ = updateCriteriaQuery(editedCriteria);

//     // DELETE CRITERIA QUERY
//     const deleteCriteriaQ = `
//       DELETE FROM mst_criteria
//       WHERE id IN (${deletedCriteria.map((item) => `'${item}'`).join(", ")})`;
//     console.log(deleteCriteriaQ);

//     // EXECUTE ALL QUERY PARALLEL
//     const [groupResult, insertItem, editItem, deleteItem] = await Promise.all([
//       await client.query(groupQ, groupV),
//       addedCriteria.length !== 0 ? client.query(insertCriteriaQ, insertCriteriaV) : null,
//       editedCriteria.length !== 0 ? client.query(updateCriteriaQ) : null,
//       deletedCriteria.length !== 0 ? client.query(deleteCriteriaQ) : null,
//     ]);

//     await client.query(TRANS.COMMIT);
//     return groupResult.rows[0].value_name;
//   } catch (error) {
//     console.error(error);
//     await client.query(TRANS.ROLLBACK);
//     throw error;
//   } finally {
//     client.release();
//   }
// };
