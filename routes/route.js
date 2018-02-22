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
var gitkeep = '.gitkeep';




function splitString(stringToSplit, separator) {
  var arr = [];
  var arrayOfStrings = stringToSplit.split(separator);
  var b;
  //console.log('The original string is: "' + stringToSplit + '"');
  //console.log('The separator is: "' + separator + '"');
  //console.log('The array has ' + arrayOfStrings.length + ' elements: ');
  console.log(arrayOfStrings);
  if(arrayOfStrings.length == 1){
    //console.log(arrayOfStrings[0]);
    b = arrayOfStrings[0].substring(2);
    b = b.slice(0, -2);
    //console.log(b);
    arr.push(b);
    console.log("b pushed into array: " + b);
  }else{  
    for(var i=0;i<arrayOfStrings.length;i++){
      if(i==0){
        //console.log(arrayOfStrings[i].substring(8));
        //console.log(arrayOfStrings[0]);
        b = arrayOfStrings[i].substring(2);
        //console.log(b);
        b = b.slice(0,-1);
        arr.push(b);
        console.log("b pushed into array: " + b);
      }else if(i==arrayOfStrings.length-1){
        //console.log(arrayOfStrings[i]);
        b = arrayOfStrings[i].substring(1);
        b = b.slice(0, -2);
        //console.log(b);
        arr.push(b);
        console.log("b pushed into array: " + b);
      }else{
        b = arrayOfStrings[i].substring(1);
        b = b.slice(0, -1);
        arr.push(b);
        console.log("b pushed into array: " + b);
      }
    }
  }
  return arr;
}


//global variables
var lc = path.join(__dirname + '/..');
var new_location = lc + '/public/images/';
var invalid_up_loc = path.join(lc + '/upload_invalid');
var village = "";
var right_loc;
var selo = "";
var in_path;
//used to render village_pic page
var list_pics = [];
var list_to_review = [];
var list_files = [];
//list invalid extension files
var inv_files = [];
//list to store checked images in v_manager
var lista = [];
//path used in v_manager 
var public_path = path.join(lc + "/public/");
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route homepage
router.get("/", (req, res) => {
   // res.render("homepage");
   res.sendFile(path.join(public_path + 'homepage.html'));
});


//route upload page
router.get("/upload", (req, res) => {
  res.render("upload");
});


//route upload_succ page
router.get("/upload_succ", (req, res) => {
  res.render("upload_succ");
});


//route for managing a village content
router.get("/manage/:a", (req, res) => {
  if(String(req.params.a) == 'dlukovo'){
    selo = 'd_lukovo';
  }else if(String(req.params.a) == 'glukovo'){
    selo = 'g_lukovo';
  }else{
    selo = String(req.params.a);
  }
  res.redirect("/1234v_manager");
});


//route updating init.pdf of a village
router.get("/update_init", (req, res) => {
  var z = 'images/demo/pdf_thumbnail.png';
  res.render("update_init",{paesino: selo, in_p: in_path});
});


//route v_manager page
router.get("/1234v_manager", (req, res) => {
  
  var init_path = path.join('images/' + selo + '/h/init.pdf');
  in_path = init_path;
  var testFolder = new_location + selo + '/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/' + selo + '/img/' + file);
      //console.log(file);
    }
    });
    var testFolder3 = new_location + selo + '/to_review/';
  fs.readdirSync(testFolder3).forEach(file=>{
    if(file != gitkeep){
      list_to_review.push('images/' + selo + '/to_review/' + file);
      //console.log(file);
    }
    });
    var testFolder2 = new_location + selo + '/h/';
    fs.readdirSync(testFolder2).forEach(file=>{
        if((file != 'init.pdf')&&(file != gitkeep)) {
        list_files.push('images/' + selo + '/h/' + file);
        //console.log(file);
        }
      });
  res.render("v_manager",{paese: selo, arr_rev: list_to_review, arr_pics: list_pics, arr_files: list_files, in_p: init_path});
  list_pics = [];
  list_to_review = [];
  list_files = [];
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route nerezi_pic page
router.get("/nerezi_pic", (req, res) => {
  var testFolder = new_location + 'nerezi/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      if(file != gitkeep){
        list_pics.push('images/nerezi/img/' + file);
        //console.log(file);
      }
    });
  res.render("pic_page",{nome: 'Nerezi',h_page: '/nerezi_h',arr: list_pics});
  list_pics = [];
});

//route modric_pic page
router.get("/modric_pic", (req, res) => {
  var testFolder = new_location + 'modric/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/modric/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Modric',h_page: '/modric_h',arr: list_pics});
  list_pics = [];
});

//route bezevo_pic page
router.get("/bezevo_pic", (req, res) => {
  var testFolder = new_location + 'bezevo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/bezevo/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Bezevo',h_page: '/bezevo_h',arr: list_pics});
  list_pics = [];
});

//route borovec_pic page
router.get("/borovec_pic", (req, res) => {
  var testFolder = new_location + 'borovec/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/borovec/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Borovec',h_page: '/borovec_h',arr: list_pics});
  list_pics = [];
});

//route d_lukovo_pic page
router.get("/d_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'd_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/d_lukovo/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Dolno Lukovo',h_page: '/d_lukovo_h',arr: list_pics});
  list_pics = [];
});

//route g_lukovo_pic page
router.get("/g_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'g_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/g_lukovo/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Gorno Lukovo',h_page: '/g_lukovo_h',arr: list_pics});
  list_pics = [];
});

//route drenok_pic page
router.get("/drenok_pic", (req, res) => {
  var testFolder = new_location + 'drenok/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/drenok/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Drenok',h_page: '/drenok_h',arr: list_pics});
  list_pics = [];
});

//route jablanica_pic page
router.get("/jablanica_pic", (req, res) => {
  var testFolder = new_location + 'jablanica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/jablanica/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Jablanica',h_page: '/jablanica_h',arr: list_pics});
  list_pics = [];
});

//route lakavica_pic page
router.get("/lakavica_pic", (req, res) => {
  var testFolder = new_location + 'lakavica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/lakavica/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Lakavica',h_page: '/lakavica_h',arr: list_pics});
  list_pics = [];
});

//route piskupshtina_pic page
router.get("/piskupshtina_pic", (req, res) => {
  var testFolder = new_location + 'piskupshtina/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/piskupshtina/img/' + file);
      //console.log(file);
    }
    });
  res.render("pic_page",{nome: 'Piskupshtina',h_page: '/piskupshtina_h',arr: list_pics});
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
    if(field == 'dlukovo'){
      village = 'd_lukovo';
    }else if(field == 'glukovo'){
      village = 'g_lukovo';
    }else{
      village = field;
    }
    console.log('village: ' + village);
  });

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        console.log('filebegin here');
        var fileType = path.extname(file.name);
        console.log(fileType);
        if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' )){
          right_loc = new_location + village + '/to_review';
          var exists = fs.existsSync(right_loc);
          if(exists){
            console.log('folder exists!');
          //rename the incoming file to the file's name
            file.path = path.join(right_loc + '/' + uniqid() + fileType);
          }else{
            console.log('folder does not exists');
            console.log('making that directory');
            fsExtra.mkdir(right_loc);
            file.path = path.join(right_loc + '/' + uniqid() + fileType);
          }
        }else if(fileType == '.pdf' ){
          right_loc = new_location + village + '/h';
          var exists2 = fs.existsSync(right_loc);
          if(exists2){
            console.log('folder exists!');
          //rename the incoming file to the file's name
          file.path = path.join(right_loc + '/' + uniqid() + fileType);
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
              if(file != gitkeep){
              var filePath = path.join(invalid_up_loc  + '/' + file);
              fs.unlinkSync(filePath);
                console.log('removed file: ' + file + ' with extension: ' + path.extname(file));
              }
              });
            }
            console.log("success!");
            res.redirect('/upload_succ');            
        });
});
//---------------------------------------------------------------------------------------------------------------------------------------
//handling updating init.pdf of a village
router.post("/update_init", (req, res) => {
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    var nuovo_path;
    var vecchio_path = files.filetoupload.path;
    console.log(vecchio_path);
    var ext = path.extname(files.filetoupload.name);
    console.log("file extension: " + ext);
    if(ext == '.pdf'){
      right_loc = new_location + selo + '/h';
      var exists5 = fs.existsSync(right_loc);
      if(exists5){
        console.log('folder exists!');
        //delete old init.pdf
        var inpdf = path.join(right_loc + '/init.pdf');
        fs.unlinkSync(inpdf);
        //rename the incoming file to the file's name
        nuovo_path = right_loc + '/init.pdf';
      }else{
        console.log('folder does not exists');
        console.log('making that directory');
        fsExtra.mkdir(right_loc);
        nuovo_path = right_loc + '/init.pdf';
      }
      fs.rename(vecchio_path, nuovo_path, function (err) {
        if (err) throw err;
        console.log('File uploaded and moved!');
      });
    }else{
      nuovo_path = lc + '/upload_invalid/' + files.filetoupload.name;
      fs.rename(vecchio_path, nuovo_path, function (err) {
        if (err) throw err;
        fs.unlinkSync(nuovo_path);
        console.log('File not valid, moved and deleted!');
      });
     }
    res.redirect('/');
    res.end();
  });
});




//---------------------------------------------------------------------------------------------------------------------------------------
//handling manager page form
router.post('/1234v_manager', function (req, res) {
  var decision = req.body.sub;
  console.log(req.body.sub);
  lista = req.body.p;
  //console.log("lista: " + lista);
  var a = JSON.stringify(lista);
  console.log("a = " + JSON.stringify(lista));
  var l;
  var comma = ',';
  l = splitString(a,comma);
  console.log("array l: " + l);
  console.log("array l has " + l.length + " elements");
  if(decision == 'pub'){
    for(var j=0;j<l.length;j++){
      var da = path.join(public_path + l[j]);
      console.log("before: " + da);
      var a = da.replace(/to_review/gi, "img");
      console.log("after: " + a);
      console.log("ready to move: " + da);
      fsExtra.moveSync(da, a);
      console.log("file moved");
    }
  }else if(decision == 'del'){
    for(var j=0;j<l.length;j++){
      console.log("ready to delete: " + path.join(public_path + l[j]));
      fs.unlinkSync(path.join(public_path + l[j]));
      console.log("file deleted");
    }
  }
  l = "";
  lista = [];
  res.redirect("/");
});

  module.exports = router;