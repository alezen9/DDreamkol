var express = require('express');
var app = express();
var route = require('./routes/route');
var path = require('path'); 

app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/', route);

// to make it visible to the rest of the programm
module.exports = app;