const mariadb = require("mariadb");

const pool = mariadb.createPool({
  host: "tebd-1.crcryyhxp4iv.us-east-2.rds.amazonaws.com",
  user: "admin",
  database: "tebd_1",
  password: "eYD21gAZr6hBd1WajGLE",
  connectionLimit: 5
});

module.exports = {
  pool
};
