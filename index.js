var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var path = require('path');
var bodyParser = require('body-parser');
var config = require('./server/config/global');

var port = process.env.PORT || config.development.port;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.set("views", path.join(__dirname, "/server/views"));

app.set("view engine", "ejs");

require('./server/routes/router')(app);

app.use(express.static("dist"));

http.listen(port, function() {
    console.log("Listening at port " + port);
});
