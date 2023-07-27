const mysql = require("mysql2");

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "us-cdbr-east-06.cleardb.net",
 user: "b1f5a013e2634d",
   password: "eabfe148",
   database: "heroku_bb16e057f7f46dd",
  waitForConnections: true,
  connectionLimit: 10,
  maxIdle: 10, 
  idleTimeout: 60000, 
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 0
});

module.exports = pool;