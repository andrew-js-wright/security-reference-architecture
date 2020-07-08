var mysql = require("mysql");
var config = require ('./config.json');
var AWS = require('aws-sdk');
var ssm = new AWS.SSM({apiVersion: '2014-11-06'})

var pool  = mysql.createPool({
	host : config.dbhost,
	user : config.dbuser,
	password : config.dbpassword,
	database : config.dbname
});

exports.handler = (event, context, callback) => {
  var params = {
    Names: [
      'DBuser',
      'DBpassword',
      'dbHostName',
      'dbName'
      ],
      WithDecryption: true
  };
  console.log(params);
  ssm.getParameters(params, function(err, data) {
    if(err) console.log(err, err.stack)
    else console.log(data)
  });
  context.callbackWaitsForEmptyEventLoop = false;
  pool.getConnection(function(err, connection) {
    if (err) throw err; // not connected!
    // Use the connection
    connection.query('SELECT email FROM accounts WHERE id = 1', function (error, results, fields) {
      // When done with the connection, release it.
      connection.release();
      // Handle error after the release.
      if (error) callback(error);
      else callback(null, results[0].email);
    });
  });
};