var mysql = require("mysql");
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var path = require("path");

var connection = mysql.createConnection({
  host: "localhost",
  user: "testuser",
  password: "password",
  database: "nodelogin",
});

var app = express();
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", function (request, response) {
  response.sendFile(path.join(__dirname + "/index.html"));
});

window._config = {
  cognito: {
      userPoolId: 'eu-west-1_sYqn1Kkzf', // e.g. us-east-2_uXboG5pAb
      userPoolClientId: '7cmr2fd1gfvmh8uqlri6b5enj3', // e.g. 25ddkmj4v6hfsfvruhpfi7n4hv
      region: 'eu-west-1' // e.g. us-east-2
  },
  api: {
      invokeUrl: '' // e.g. https://rc7nyt4tql.execute-api.us-west-2.amazonaws.com/prod',
  }
};

app.post("/auth", function (request, response) {
  var username = request.body.username;
  var password = request.body.password;

  if (username && password) {
    connection.query(
      "SELECT * FROM accounts WHERE username = ? AND password = ?",
      [username, password],
      function (error, results, fields) {
        if (error) {
          console.log(error);
        }

        if (results.length > 0) {
          request.session.loggedin = true;
          request.session.username = username;
          response.redirect("/home");
        } else {
          response.send("Incorrect Username and/or Password!");
        }
        response.end();
      }
    );
  } else {
    response.send("Please enter Username and Password!");
    response.end();
  }
});

app.get("/home", function (request, response) {
  if (request.session.loggedin) {
    response.send("Welcome back, " + request.session.username + "!");
  } else {
    response.send("Please login to view this page!");
  }
  response.end();
});

app.listen(3000);
