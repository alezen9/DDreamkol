var express = require('express');
var app = express();
var route = require('./routes/route');
var path = require('path'); 
var cors = require('cors');
var compression = require('compression');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(cors());
app.use(express.static('public'));
app.use(compression());
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/', route);


// to make it visible to the rest of the programm
module.exports = app;