var mysql = require("mysql");
var config = require ('./config.json');

var pool  = mysql.createPool({
	host : config.dbhost,
	user : config.dbuser,
	password : config.dbpassword,
	database : config.dbname
});

pool.getConnection(function(err, connection) {
  if (err) throw err; // not connected!

  // Use the connection
  connection.query('SELECT email FROM accounts WHERE id = 1', function (error, results, fields) {
    // When done with the connection, release it.
    connection.release();

    // Handle error after the release.
    if (error) throw error
    else console.log(results[0].email);

    process.exit();

    // Don't use the connection here, it has been returned to the pool.
  });
});
