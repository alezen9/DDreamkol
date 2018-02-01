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


// json vreating or reading with pic/file number
var file_a;
var exists = fs.existsSync('data.json');
if (exists) {
  // Read the file
  console.log('loading database');
  var txt = fs.readFileSync('data.json', 'utf8');
  // Parse it  back to object
  file_a = JSON.parse(txt);
} else {
  // Otherwise start with blank list
  console.log('empty database');
  file_a = {
			  "id": 0
			};
}

// global variables
var lc = path.join(__dirname + '/..');
//console.log(lc);
var new_location = lc + '/public/images/';
//console.log(new_location);
var village = "";
var right_loc;
var list_pics = [];
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route homepage
router.get("/", (req, res) => {
    res.render("homepage");
});


//route upload page
router.get("/upload", (req, res) => {
  res.render("upload");
});


//route upload_succ page
router.get("/upload_succ", (req, res) => {
  res.render("upload_succ");
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route nerezi_pic page
router.get("/nerezi_pic", (req, res) => {
  var testFolder = new_location + 'nerezi/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/nerezi/img/' + file);
      //console.log(file);
    });
  res.render("nerezi_pic",{arr: list_pics});
  list_pics = [];
});

//route modric_pic page
router.get("/modric_pic", (req, res) => {
  var testFolder = new_location + 'modric/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/modric/img/' + file);
      //console.log(file);
    });
  res.render("modric_pic",{arr: list_pics});
  list_pics = [];
});

//route bezevo_pic page
router.get("/bezevo_pic", (req, res) => {
  var testFolder = new_location + 'bezevo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/bezevo/img/' + file);
      //console.log(file);
    });
  res.render("bezevo_pic",{arr: list_pics});
  list_pics = [];
});

//route borovec_pic page
router.get("/borovec_pic", (req, res) => {
  var testFolder = new_location + 'borovec/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/borovec/img/' + file);
      //console.log(file);
    });
  res.render("borovec_pic",{arr: list_pics});
  list_pics = [];
});

//route d_lukovo_pic page
router.get("/d_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'd_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/d_lukovo/img/' + file);
      //console.log(file);
    });
  res.render("d_lukovo_pic",{arr: list_pics});
  list_pics = [];
});

//route g_lukovo_pic page
router.get("/g_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'g_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/g_lukovo/img/' + file);
      //console.log(file);
    });
  res.render("g_lukovo_pic",{arr: list_pics});
  list_pics = [];
});

//route drenok_pic page
router.get("/drenok_pic", (req, res) => {
  var testFolder = new_location + 'drenok/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/drenok/img/' + file);
      //console.log(file);
    });
  res.render("drenok.pdf",{arr: list_pics});
  list_pics = [];
});

//route jablanica_pic page
router.get("/jablanica_pic", (req, res) => {
  var testFolder = new_location + 'jablanica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/jablanica/img/' + file);
      //console.log(file);
    });
  res.render("jablanica_pic",{arr: list_pics});
  list_pics = [];
});

//route lakavica_pic page
router.get("/lakavica_pic", (req, res) => {
  var testFolder = new_location + 'lakavica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/lakavica/img/' + file);
      //console.log(file);
    });
  res.render("lakavica_pic",{arr: list_pics});
  list_pics = [];
});

//route piskupshtina_pic page
router.get("/piskupshtina_pic", (req, res) => {
  var testFolder = new_location + 'piskupshtina/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/piskupshtina/img/' + file);
      //console.log(file);
    });
  res.render("piskupshtina_pic",{arr: list_pics});
  list_pics = [];
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route nerezi_h page
router.get("/nerezi_h", (req, res) => {
  res.render("nerezi_h");
});

//route modric_h page
router.get("/modric_h", (req, res) => {
  res.render("modric_h");
});

//route bezevo_h page
router.get("/bezevo_h", (req, res) => {
  res.render("bezevo_h");
});

//route borovec_h page
router.get("/borovec_h", (req, res) => {
  res.render("borovec_h");
});

//route d_lukovo_h page
router.get("/d_lukovo_h", (req, res) => {
  res.render("d_lukovo_h");
});

//route g_lukovo_h page
router.get("/g_lukovo_h", (req, res) => {
  res.render("g_lukovo_h");
});

//route drenok_h page
router.get("/drenok_h", (req, res) => {
  res.render("drenok_h");
});

//route jablanica_h page
router.get("/jablanica_h", (req, res) => {
  res.render("jablanica_h");
});

//route lakavica_h page
router.get("/lakavica_h", (req, res) => {
  res.render("lakavica_h");
});

//route piskupshtina_h page
router.get("/piskupshtina_h", (req, res) => {
  res.render("piskupshtina_h");
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//handling upload page form
router.post('/upload', function (req, res) {
  //village = req.body.village;
  //console.log(village);
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files){
    console.log('trying to upload');
    console.log('upload recived');
    //console.log(village);
  });

  form.on('field', function(name, field) {
    console.log('Got a field:', field);
    console.log('Got a field name:', name);
    village = field;
    console.log('village: ',village);
    //console.log(field.name);
  });

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        console.log('filebegin here');
        var fileType = path.extname(file.name);
        console.log(fileType);
        if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' )){
        right_loc = new_location + village + '/img/';
        //rename the incoming file to the file's name
        file.path = right_loc + file_a.id + "-" + file.name;
        file_a.id = file_a.id +1;
        // update json
        fs.writeFile('./data.json', JSON.stringify(file_a, null, 2), 'utf-8', function(err) {
          if (err) throw err;
          
        });
      }else if(fileType == '.pdf' ){
        right_loc = new_location + village + '/h/';
        //rename the incoming file to the file's name
        file.path = right_loc + file_a.id + "-" + file.name;
        file_a.id = file_a.id +1;
        // update json
        fs.writeFile('./data.json', JSON.stringify(file_a, null, 2), 'utf-8', function(err) {
          if (err) throw err;
          
        });
      }
        //file.path = new_location + uniqid(village + "-") + file.name;
});

  form.on('end', function(fields, files) {
            console.log("success!");
            res.redirect('/upload_succ');            
        });

});


  module.exports = router;