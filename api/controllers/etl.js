const { pool } = require("../../mariadb");
// import { mongoConnections } from "../../mongodb";
const { getArtigos } = require("../data/database");

module.exports = app => {
  const controller = {};

  controller.etl = async (req, res) => {
    const totalRecords = (
      await pool.query("SELECT count(1) as numberOfRecords FROM artigo")
    )[0].numberOfRecords;

    const batchSize = 10000;

    let index = 0;
    console.log("INIT");
    while (index < totalRecords) {
      let elementToGet =
        index + batchSize < totalRecords ? batchSize : totalRecords - index;

      const batchArtigos = await getArtigos(index, elementToGet);

      if (index === totalRecords) break;
      index += elementToGet;
    }
    res.json({ ok: true });
  };

  return controller;
};
