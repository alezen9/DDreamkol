let express = require('express');
let app = express();
let route = require('./routes/route');
let path = require('path'); 
let bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('public'));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use('/', route);

// to make it visible to the rest of the programm
module.exports = app;