var mysql = require('mysql2/promise');

var con = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "special_topics_demo",
});

module.exports = con;