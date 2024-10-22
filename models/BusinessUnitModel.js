const db = require("../config/connection");
const TRANS = require("../config/transaction");
const { insertQuery, updateQuery } = require("../helper/queryBuilder");

const createBusinessUnit = async (payload) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = insertQuery("mst_business_unit", payload, "code_business_unit");
    const result = await client.query(q, v);
    await client.query(TRANS.COMMIT);
    return result.rows;
  } catch (error) {
    console.log(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

const readBusinessUnit = async () => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
    SELECT * FROM mst_business_unit
    `
    );
    await client.query(TRANS.COMMIT);
    return result.rows;
  } catch (error) {
    console.log(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

const updateBusinessUnit = async (payload, id_business_unit) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = updateQuery(
      "mst_business_unit",
      payload,
      { id_business_unit },
      "code_business_unit"
    );
    const result = await client.query(q, v);
    await client.query(TRANS.COMMIT);
    return result.rows;
  } catch (error) {
    console.log(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

const deleteBusinessUnit = async () => {};

module.exports = { createBusinessUnit, readBusinessUnit, updateBusinessUnit, deleteBusinessUnit };
