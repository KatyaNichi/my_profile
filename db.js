const mysql = require("mysql2");
const connection = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "rooT123!4",
  database: "my_profile",
  port: 3306,
});
connection.query('SELECT 1 + 1 AS result', (error, results, fields) => {
  if (error) {
    console.error('Ошибка выполнения запроса:', error);
  } else {
    console.log('Результат:', results[0].result);
  }
});
module.exports = connection;
