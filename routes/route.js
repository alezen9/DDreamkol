var express = require('express');
var app = express();
var router = express.Router();
var path = require('path'); 
var fs = require('fs');
var formidable = require('formidable');
const pug = require('pug');

router.get("/", (req, res) => {
    res.render("homepage");
});
/*
router.get('/',function(req,res){
    res.sendFile(path.join(__dirname + '/../views/index.html'));
    //__dirname : It will resolve to your project folder.
  });
*/
  module.exports = router;