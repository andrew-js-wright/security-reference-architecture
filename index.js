var mysql = require("mysql");
var AWS = require('aws-sdk');
var ssm = new AWS.SSM({apiVersion: '2014-11-06'});

exports.handler = (event, context, callback) => {
    const params = {
        "Names": [
        "DBUser",
        "DBPassword",
        "DBName",
        "DBHostName"
        ], "WithDecryption": true
    };
    ssm.getParameters(params, function(err, data) {
        context.callbackWaitsForEmptyEventLoop = false;
        if(err) console.log(err, err.stack);
        else {
            for (let i = 0; i < 4; i++) {
                if (data.Parameters[i].Name == "DBHostName") {
                    var theHostName = data.Parameters[i].Value;
                } else if (data.Parameters[i].Name == "DBUser") {
                    var theUser = data.Parameters[i].Value;
                }
                else if (data.Parameters[i].Name == "DBName") {
                    var theName = data.Parameters[i].Value;
                }
                else if (data.Parameters[i].Name == "DBPassword") {
                    var thePassword = data.Parameters[i].Value;
                }
            } 
        }
        var pool  = mysql.createPool({
        host : theHostName,
        user : theUser,
        password : thePassword,
        database : theName
        });
        var example_user = "test";
        var example_password = "test";
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            // Use the connection
            connection.query('SELECT COUNT(*) AS theCount FROM accounts WHERE username = "' + example_user +
                '" AND password = "' + example_password + '"', 
            function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release.
                if (error) callback(error);
                else callback(null, results[0].theCount);
                if (results[0].theCount == 1) {
                    console.log("Success: Authentication succeeded");
                } else {
                    console.log("Failure: Authentication failed");
                }
            }); 
        }); 
    });
};