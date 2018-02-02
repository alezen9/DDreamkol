var express = require('express');
var router = express.Router();
var path = require('path'); 
var fs = require('fs');
var formidable = require('formidable');
var pug = require('pug');
var util = require('util');
var fsExtra  = require('fs-extra');
var uniqid = require('uniqid');
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));

//global variables
var lc = path.join(__dirname + '/..');
var new_location = lc + '/public/images/';
var invalid_up_loc = path.join(lc + '/upload_invalid');
var village = "";
var right_loc;
//used to render village_pic page
var list_pics = [];
var list_files = [];
//list invalid extension files
var inv_files = [];
//list to store checked images in v_manager
var lista = [];
//path used in v_manager 
var delete_path = path.join(lc + "/public/");
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


//route v_manager page
router.get("/1234v_manager", (req, res) => {
  village = "nerezi";
  var init_path = path.join('images/' + village + '/h/init.pdf')
  var testFolder = new_location + 'nerezi/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      list_pics.push('images/nerezi/img/' + file);
      //console.log(file);
    });
    var testFolder2 = new_location + 'nerezi/h/';
    fs.readdirSync(testFolder2).forEach(file=>{
        if(file != 'init.pdf'){
        list_files.push('images/nerezi/h/' + file);
        //console.log(file);
        }
      });
  res.render("v_manager",{paese: "Nerezi", arr_pics: list_pics, arr_files: list_files, in_p: init_path});
  list_pics = [];
  list_files = [];
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
  var form = new formidable.IncomingForm();

  form.parse(req, function (err, fields, files){
    console.log('trying to upload');
    console.log('upload recived');
  });

  form.on('field', function(name, field) {
    console.log('Got a field:', field);
    console.log('Got a field name:', name);
    village = field;
    console.log('village: ' + village);
  });

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        console.log('filebegin here');
        var fileType = path.extname(file.name);
        console.log(fileType);
        if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' )){
          right_loc = new_location + village + '/img';
          var exists = fs.existsSync(right_loc);
          if(exists){
            console.log('folder exists!');
          //rename the incoming file to the file's name
            file.path = right_loc + '/' + uniqid() + fileType;
          }else{
            console.log('folder does not exists');
            console.log('making that directory');
            fsExtra.mkdir(right_loc);
            file.path = right_loc + '/' + uniqid() + fileType;
          }
        }else if(fileType == '.pdf' ){
          right_loc = new_location + village + '/h';
          var exists2 = fs.existsSync(right_loc);
          if(exists2){
            console.log('folder exists!');
          //rename the incoming file to the file's name
          file.path = right_loc + '/' + uniqid() + fileType;
          }else{
            console.log('folder does not exists');
            console.log('making that directory');
            fsExtra.mkdir(right_loc);
            file.path = right_loc + '/' + uniqid() + fileType;
          }
      }else{
        var exists3 = fs.existsSync(invalid_up_loc);
          if(exists3){
            console.log('folder exists!');
            file.path = invalid_up_loc + '/' + uniqid() + fileType;
          }else{
            console.log('folder does not exists');
            console.log('making that directory');
            fsExtra.mkdir(invalid_up_loc);
            file.path = invalid_up_loc + '/' + uniqid() + fileType;
          }
      }
});

  form.on('end', function(fields, files) {
    var exists4 = fs.existsSync(invalid_up_loc);
      if(exists4){
            var testFolder = path.join(invalid_up_loc + '/');
            fs.readdirSync(testFolder).forEach(file=>{
              var filePath = invalid_up_loc + file;
              fs.unlinkSync(filePath);
                console.log('removed file: ' + file + ' with extension: ' + path.extname(file));
              });
            }
            console.log("success!");
            res.redirect('/upload_succ');            
        });
});

//handling manager page form
router.post('/1234v_manager', function (req, res) {
  if(req.body.pic){
  lista = req.body.pic;
  }else if(req.body.h){
    lista = req.body.h;
  }
  console.log("lista: " + lista);
  lista.forEach(function(element){
    console.log("ready to delete: " + path.join(delete_path + element));
    fs.unlinkSync(path.join(delete_path + element));
    console.log("file deleted");
    });
  lista = [];
  res.redirect("/");

});

  module.exports = router;