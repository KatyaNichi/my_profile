const mysql = require("mysql2");
// const connection = mysql.createConnection({
//   host: "127.0.0.1",
//   user: "root",
//   password: "rooT123!4",
//   database: "my_profile",
//   port: 3306,
// });
// const connection = mysql.createConnection({
//   host: "us-cdbr-east-06.cleardb.net",
//   user: "b1f5a013e2634d",
//   password: "eabfe148",
//   database: "heroku_bb16e057f7f46dd",
// })
// get the client

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
 user: "b1f5a013e2634d",
   password: "eabfe148",
   database: "heroku_bb16e057f7f46dd",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

//module.exports = connection;
module.exports = pool;