import { db } from "#dep/config/connection";
import { TRANSACTION as TRANS } from "#dep/config/transaction";

export const getPage = async (roleId: string) => {
  const client = await db.connect();
  try {
    await client.query(TRANS.BEGIN);
    const result = await client.query(
      `
        SELECT * FROM mst_page_access ac
        LEFT JOIN mst_page pg ON ac.page_id = pg.id
        WHERE ac.role_id = $1
        ORDER BY pg.position
    `,
      [roleId]
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
