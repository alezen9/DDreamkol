let express = require('express');
let router = express.Router();
let path = require('path'); 
let fs = require('fs');
let formidable = require('formidable');
let pug = require('pug');
let util = require('util');
let fsExtra  = require('fs-extra');
let uniqid = require('uniqid');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));


var new_location = __dirname + '/upload/';
var village = "";

router.get("/", (req, res) => {
    res.render("homepage");
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post('/upload', function (req, res) {
  //village = req.body.village;
  //console.log(village);
  var form = new formidable.IncomingForm();
  /*var village = req.body.village;
  console.log(village);
  //form.uploadDir = path.join(__dirname, "upload");
  var fileType = path.extname(req.body.file_upload);
  console.log(fileType);
  */

  form.parse(req, function (err, fields, files){
    console.log('trying to upload');
    console.log('upload recived');
    //console.log(village);
    //res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('field', function(name, field) {
    console.log('Got a field:', field);
    console.log('Got a field name:', name);
    village = field;
    console.log('village: ',village)
    //console.log(field.name);
  });

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        console.log('filebegin here');
        //rename the incoming file to the file's name
        file.path = new_location + uniqid(village + "-") + file.name;
});

  form.on('end', function(fields, files) {
            console.log("success!");
            res.redirect('/');
        });

});


  module.exports = router;