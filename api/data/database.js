const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "tebd-1.crcryyhxp4iv.us-east-2.rds.amazonaws.com",
  user: "admin",
  database: "tebd_1",
  password: "eYD21gAZr6hBd1WajGLE",
  connectionLimit: 5
});

async function getParticipantes() {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query("SELECT 1 as val")[0];
    const avaliacao = await conn.query(
      "SELECT * from participante WHERE idParticipante = 1"
    );
    //const rows = await conn.query("SELECT * from avaliacao");
    console.log(avaliacao);
    return rows;
    /*console.log(rows); //[ {val: 1}, meta: ... ]
      const res = await conn.query("INSERT INTO myTable value (?, ?)", [
        1,
        "mariadb"
      ]);
      console.log(res); // { affectedRows: 1, insertId: 1, warningStatus: 0 }*/
  } catch (err) {
    console.log(err);
    throw err;
  } finally {
    if (conn) return conn.end();
  }
}

module.exports = {
  getParticipantes
};
