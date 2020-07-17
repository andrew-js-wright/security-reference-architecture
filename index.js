var mysql = require('mysql');
const AWS = require('aws-sdk');
var secretName = 'mysql_secrets';
var secret;
var decodedBinarySecret;
var sm = new AWS.SecretsManager({ region: 'eu-west-1' });

exports.handler = (event, context, callback) => {
    sm.getSecretValue({ SecretId: secretName }, function (err, data) {
        context.callbackWaitsForEmptyEventLoop = false;
        if (err) {
            throw err;
        } else {
          if ('SecretString' in data) {
                secret = data.SecretString;
            } else {
                let buff = new Buffer(data.SecretBinary, 'base64');
                decodedBinarySecret = buff.ToString('ascii');
            }
        }
        const secretJSON = JSON.parse(secret);
        var pool = mysql.createPool({
            host: secretJSON.hostname,
            user: secretJSON.user,
            password: secretJSON.password,
            database: secretJSON.name
        });
        var example_user = "test";
        var example_password = "test";
        pool.getConnection(function(err, connection) {
            if (err) throw err; // not connected!
            // Use the connection
            connection.query('SELECT COUNT(*) AS theCount FROM accounts WHERE username = "' + example_user +
            '" AND password = "' + example_password + '"', function (error, results, fields) {
                // When done with the connection, release it.
                connection.release();
                // Handle error after the release
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