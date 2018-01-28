let express = require('express');
let router = express.Router();
let path = require('path'); 
let fs = require('fs');
let formidable = require('formidable');
let pug = require('pug');
let util = require('util');
let fsExtra  = require('fs-extra');

router.get("/", (req, res) => {
    res.render("homepage");
});

router.get("/upload", (req, res) => {
  res.render("upload");
});

router.post('/upload', function (req, res) {
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
    //res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /* Temporary location of our uploaded file */
    var temp_path = this.openedFiles[0].path;
    /* The file name of the uploaded file */
    var file_name = this.openedFiles[0].name;
    /* Location where we want to copy the uploaded file */
    var new_location = __dirname + '/upload/';
    fsExtra.copy(temp_path, new_location + file_name, function(err) {  
        if (err) {
            console.error(err);
        } else {
            console.log("success!");
            res.redirect('/');
        }
      });
  });

});


  module.exports = router;