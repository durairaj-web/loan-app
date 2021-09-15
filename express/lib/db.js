const mysql = require("mysql");

var mysqlConnection = mysql.createConnection({
  host: "mysql-47125-0.cloudclusters.net",
  user: "root",
  password: "o~1ZJU~9@(Ex-T[v",
  database: "loan_app",
  port: 19872,
  multipleStatements: true,
});

mysqlConnection.connect((err) => {
  if (!err) {
    console.log("Connected");
  } else {
    console.log("Connection Failed");
  }
});

module.exports = mysqlConnection;
