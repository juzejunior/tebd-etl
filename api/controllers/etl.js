const { pool } = require("../../mariadb");
const MongoDB = require("../../mongodb");
const { getArtigos } = require("../data/database");

module.exports = app => {
  const controller = {};

  controller.etl = async (req, res) => {
    /*
    const totalRecords = (
      await pool.query("SELECT count(1) as numberOfRecords FROM artigo")
    )[0].numberOfRecords;
*/

    const totalRecords = 20;
    const batchSize = 10;

    let index = 0;
    console.log("INIT");
    try {
      await MongoDB.connect();
      while (index < totalRecords) {
        console.log("INSIDE WHILE");
        let elementToGet =
          index + batchSize < totalRecords ? batchSize : totalRecords - index;

        const batchArtigos = await getArtigos(index, elementToGet);
        const res = await MongoDB.insertAll(batchArtigos);
        if (index === totalRecords) break;
        index += elementToGet;
      }
    } catch (err) {
      res.json({
        ok: false,
        error: "Erro no processamento de lotes",
        lotes: index / batchSize,
        percentage: index / totalRecords
      });
    }

    res.json({
      ok: true,
      error: null,
      lotes: index / batchSize,
      percentage: index / totalRecords
    });
  };

  return controller;
};
