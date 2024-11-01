const db = require("../config/connection");
const TRANS = require("../config/transaction");
const { insertQuery, updateQuery, deleteQuery } = require("../helper/queryBuilder");

const createBusinessUnit = async (payload) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = insertQuery("mst_business_unit", payload, "bu_code");
    const result = await client.query(q, v);
    await client.query(TRANS.COMMIT);
    return result.rows[0].bu_code;
  } catch (error) {
    console.error(error);
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
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

const updateBusinessUnit = async (payload, id) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = updateQuery("mst_business_unit", payload, { id }, "code");
    const result = await client.query(q, v);
    if (result.rowCount === 0) throw new Error(`ID ${id} not exist`);
    await client.query(TRANS.COMMIT);
    return result.rows[0].code;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

const deleteBusinessUnit = async (id) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const [q, v] = deleteQuery("mst_business_unit", { id });
    const result = await client.query(q, v);
    if (result.rowCount === 0) throw new Error(`ID ${id} not exist`);
    await client.query(TRANS.COMMIT);
    console.log(result);
    return id;
  } catch (error) {
    console.error(error);
    await client.query(TRANS.ROLLBACK);
    throw error;
  } finally {
    client.release();
  }
};

module.exports = { createBusinessUnit, readBusinessUnit, updateBusinessUnit, deleteBusinessUnit };
