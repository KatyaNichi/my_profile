const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "fooCoding321",
  database: "my_profile",
  port: 3306,
});
module.exports = connection;
