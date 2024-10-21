const db = require("../config/connection");
const TRANS = require("../config/transaction");
const { insertQuery, updateQuery } = require("../helper/queryBuilder");

const createBusinessUnit = async () => {};

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

const updateBusinessUnit = async () => {};

const deleteBusinessUnit = async () => {};

module.exports = { createBusinessUnit, readBusinessUnit, updateBusinessUnit, deleteBusinessUnit };
