let express = require('express');
let router = express.Router();
let path = require('path'); 
let fs = require('fs');
let formidable = require('formidable');
let pug = require('pug');
let util = require('util');
let fsExtra  = require('fs-extra');

var new_location = __dirname + '/upload/';

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

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        //rename the incoming file to the file's name
        file.path = new_location + file.name;
})

  form.on('end', function(fields, files) {
            console.log("success!");
            res.redirect('/');
        });

});


  module.exports = router;