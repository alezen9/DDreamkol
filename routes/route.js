const express = require('express');
const router = express.Router();
const path = require('path'); 
const fs = require('fs');
const formidable = require('formidable');
const pug = require('pug');
const util = require('util');
//const hbjs = require('handbrake-js');
const fsExtra  = require('fs-extra');
const uniqid = require('uniqid');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
const gitkeep = '.gitkeep';
const sharp = require('sharp');

// local database
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
			"users": [],
			  "id": 0
			};
}

// functions -------------------------------------------------------------------------------------------------------------------------------------
function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];
  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();
  var hour = date.getHours();
  var minute = date.getMinutes();
  var seconds = date.getSeconds();
  return day + ' ' + monthNames[monthIndex] + ' ' + year + ' ' + hour + ':' + minute + ':' + seconds;
}

function splitString(stringToSplit, separator) {
  var arr = [];
  var arrayOfStrings = stringToSplit.split(separator);
  var b;
  //console.log('The original string is: "' + stringToSplit + '"');
  //console.log('The separator is: "' + separator + '"');
  //console.log('The array has ' + arrayOfStrings.length + ' elements: ');
  //console.log(arrayOfStrings);
  if(arrayOfStrings.length == 1){
    //console.log(arrayOfStrings[0]);
    b = arrayOfStrings[0].substring(2);
    b = b.slice(0, -2);
    //console.log(b);
    arr.push(b);
    //console.log("b pushed into array: " + b);
  }else{  
    for(var i=0;i<arrayOfStrings.length;i++){
      if(i==0){
        //console.log(arrayOfStrings[i].substring(8));
        //console.log(arrayOfStrings[0]);
        b = arrayOfStrings[i].substring(2);
        //console.log(b);
        b = b.slice(0,-1);
        arr.push(b);
        //console.log("b pushed into array: " + b);
      }else if(i==arrayOfStrings.length-1){
        //console.log(arrayOfStrings[i]);
        b = arrayOfStrings[i].substring(1);
        b = b.slice(0, -2);
        //console.log(b);
        arr.push(b);
        //console.log("b pushed into array: " + b);
      }else{
        b = arrayOfStrings[i].substring(1);
        b = b.slice(0, -1);
        arr.push(b);
        //console.log("b pushed into array: " + b);
      }
    }
  }
  return arr;
}

function vmanager_load(imgFolder,trFolder,tmbpFolder,tmbtrFolder,ps){
  fs.readdirSync(imgFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/' + ps + '/img/' + file);
      list_ext2.push(path.extname(file));
    }
  });
    
  fs.readdirSync(trFolder).forEach(file=>{
    if(file != gitkeep){
      if((path.extname(file) != '.mp4') && (path.extname(file) != '.MP4') && (path.extname(file) != '.m4v') && (path.extname(file) != '.M4V') && (path.extname(file) != '.jpeg') && (path.extname(file) != '.jpg') && (path.extname(file) != '.png') (path.extname(file) != '.JPEG') && (path.extname(file) != '.JPG') && (path.extname(file) != '.PNG')){
      }
      list_to_review.push('images/' + ps + '/to_review/' + file);
      list_ext.push(path.extname(file));
    }
  });
    
    fs.readdirSync(tmbtrFolder).forEach(file=>{
        if(file != gitkeep){
          listtmbdel.push('images/' + ps + '/tmb/to_rev/' + file);
        }
    });
    
    fs.readdirSync(tmbpFolder).forEach(file=>{
        if(file != gitkeep){
          listtmbpub.push('images/' + ps + '/tmb/published/' + file);
        }
    });    
}

// functions end -------------------------------------------------------------------------------------------------------------------------------------
//global variables---------------------------------------------------------------------------------------------------------------------------
const lc = path.join(__dirname + '/..');                              // DDreamkol path
const new_location = lc + '/public/images/';                          // images location
const invalid_up_loc = path.join(lc + '/upload_invalid');             // upload_invalid location
var village = "";                                                   // used in upload page form handling
var right_loc;                                                      // destination path to upload pictures
var selo = "";                                                      // used in vmanager and manage/:a
var list_pics = [];                                                  // all published pics of a village
var list_to_review = [];                                             // all to_review pics of a village
var list_ext = [];                                                   // all published pics extensions of a village (in pic page), all to_review pics extensions (in vmanager)
var lista = [];                                                      // all selected pics from vmanager
var public_path = path.join(lc + "/public/");                        // public location
var list_ext2 = [];                                                  // all published pics extensions of a village (in vmanager)
var tothumbSRC = [];                                                 // list of all pictures to make thumbnail
var tothumbDST = [];                                                 // destination for every thumbnail to make
var tmbPath;                                                         // thumbnail destination path
var tmp_img;                                                         // folder to store images on upload before rotating and moving to to_review
var imgDST = [];                                                     // image destination (to_review folder) for when using sharp to autorotate
var toDelete = [];                                                   // images to delete from tmp_img
var listtmb = [];                                                    // list of thumbnails of published pics of a village
var listtmbdel = [];                                                 // list of thumbnails to be deleted
var listtmbpub = [];                                                 // list thumbnails to move into published folder
//--------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route homepage
router.get("/", (req, res) => {
   res.sendFile(path.join(public_path + 'homepage.html'));
});


//route upload page
router.get("/upload", (req, res) => {
  //res.render("upload");
  res.sendFile(path.join(public_path + 'upload.html'));
});


//route people say page
router.get("/peopleSay", (req, res) => {
  var reply2 = file_a.users;
  res.render("peopleSay",{reply: reply2});
});


//route people say EDITING page
router.get("/peopleSayEdit", (req, res) => {
  var reply3 = file_a.users;
  res.render("peopleSayEdit",{reply: reply3});
});

//route upload_succ page
router.get("/upload_succ", (req, res) => {
  res.sendFile(path.join(public_path + 'upload_succ.html'));
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


//route manager
router.get("/manager", (req, res) => {

  var paesi = ["bezevo","borovec","drenok","d_lukovo","g_lukovo","jablanica","lakavica","modric","nerezi","piskupshtina"];
  var indice;
  var count = [];
  var countNO = [];
  var contatoreOK = 0;
  var contatoreNOok = 0;
  for(indice=0;indice<10;indice++){
    var testFolder6 = new_location + paesi[indice] + '/to_review/';
    fs.readdirSync(testFolder6).forEach(file=>{
      if(file != gitkeep){
        if((path.extname(file) == ".mkv") || (path.extname(file) == ".mov") || (path.extname(file) == ".MOV") || (path.extname(file) == ".avi")){
          contatoreNOok++;
        }else{
          contatoreOK++;
        }
      }
    });
    //console.log(paesi[indice] + ": " + contatore);
    count[indice] = contatoreOK;
    countNO[indice] = contatoreNOok;
    //console.log(paesi[indice]);
    //console.log("ok: " + contatoreOK);
    //console.log("no ok: " + contatoreNOok);
    contatoreOK = 0;
    contatoreNOok = 0;
  }
  res.render("manager",{array: count, arrayNO: countNO});
  //res.sendFile(path.join(public_path + 'manager.html'));
});

//route v_manager page
router.get("/1234v_manager", (req, res) => {
  
  var testFolder = new_location + selo + '/img/';
  var toReviewFolder = new_location + selo + '/to_review/';
  var tmbPubFolder = new_location + selo + '/tmb/published/';
  var tmbTo_revFolder = new_location + selo + '/tmb/to_rev/';
  
  vmanager_load(testFolder,toReviewFolder,tmbPubFolder,tmbTo_revFolder,selo);

  toDelete.forEach(immagine =>{
    fsExtra.remove(immagine, err =>{
      if (err){
        return console.log("errore rimozione immagine da img_tmp: " + err);
      }else{
        console.log("immagine rimossa da img_tmp"); 
      }
    })
  });

  res.render("v_manager",{paese: selo, arr_rev: list_to_review, arr_pics: list_pics, arrext: list_ext2,arrext2: list_ext, arrtmbdel: listtmbdel, arrtmbpub: listtmbpub});
  list_pics = [];
  list_to_review = [];
  selo = "";
  list_ext2 = [];
  list_ext = [];
  listtmbdel = [];
  listtmbpub = [];
  toDelete = [];
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route nerezi_pic page
router.get("/nerezi_pic", (req, res) => {
  var testFolder = new_location + 'nerezi/img/';
  fs.readdirSync(testFolder).forEach(file=>{
      if(file != gitkeep){
        list_pics.push('images/nerezi/img/' + file);
        //console.log(path.extname(file));
        list_ext.push(path.extname(file));
      }
    });
    var tmbPicsFolder = new_location + 'nerezi/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/nerezi/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Nerezi',h_page: '/nerezi_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route modric_pic page
router.get("/modric_pic", (req, res) => {
  var testFolder = new_location + 'modric/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/modric/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'modric/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/modric/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Modric',h_page: '/modric_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route bezevo_pic page
router.get("/bezevo_pic", (req, res) => {
  var testFolder = new_location + 'bezevo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/bezevo/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'bezevo/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/bezevo/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Bezevo',h_page: '/bezevo_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route borovec_pic page
router.get("/borovec_pic", (req, res) => {
  var testFolder = new_location + 'borovec/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/borovec/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'borovec/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/borovec/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Boroec',h_page: '/borovec_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route d_lukovo_pic page
router.get("/d_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'd_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/d_lukovo/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'd_lukovo/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/d_lukovo/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Dolno Lukovo',h_page: '/d_lukovo_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route g_lukovo_pic page
router.get("/g_lukovo_pic", (req, res) => {
  var testFolder = new_location + 'g_lukovo/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/g_lukovo/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'g_lukovo/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/g_lukovo/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Gorno Lukovo',h_page: '/g_lukovo_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route drenok_pic page
router.get("/drenok_pic", (req, res) => {
  var testFolder = new_location + 'drenok/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/drenok/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'drenok/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/drenok/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Drenok',h_page: '/drenok_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route jablanica_pic page
router.get("/jablanica_pic", (req, res) => {
  var testFolder = new_location + 'jablanica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/jablanica/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'jablanica/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/jablanica/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Jablanica',h_page: '/jablanica_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route lakavica_pic page
router.get("/lakavica_pic", (req, res) => {
  var testFolder = new_location + 'lakavica/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/lakavica/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'lakavica/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/lakavica/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Lakavica',h_page: '/lakavica_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});

//route piskupshtina_pic page
router.get("/piskupshtina_pic", (req, res) => {
  var testFolder = new_location + 'piskupshtina/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/piskupshtina/img/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbPicsFolder = new_location + 'piskupshtina/tmb/published/';
    fs.readdirSync(tmbPicsFolder).forEach(file=>{
        if(file != gitkeep){
          listtmb.push('images/piskupshtina/tmb/published/' + file);
        }
    });
  res.render("pic_page",{nome: 'Piskupshtina',h_page: '/piskupshtina_h',arr: list_pics,arrext: list_ext, arrtmb: listtmb});
  list_pics = [];
  list_ext = [];
  listtmb = [];
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route nerezi_h page
router.get("/nerezi_h", (req, res) => {
  //res.render("nerezi_h");
  res.sendFile(path.join(public_path + 'info_nerezi.html'));
});

//route modric_h page
router.get("/modric_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_modric.html'));
});

//route bezevo_h page
router.get("/bezevo_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_bezevo.html'));
});

//route borovec_h page
router.get("/borovec_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_borovec.html'));
});

//route d_lukovo_h page
router.get("/d_lukovo_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_d_lukovo.html'));
});

//route g_lukovo_h page
router.get("/g_lukovo_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_g_lukovo.html'));
});

//route drenok_h page
router.get("/drenok_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_drenok.html'));
});

//route jablanica_h page
router.get("/jablanica_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_jablanica.html'));
});

//route lakavica_h page
router.get("/lakavica_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_lakavica.html'));
});

//route piskupshtina_h page
router.get("/piskupshtina_h", (req, res) => {
  res.sendFile(path.join(public_path + 'info_piskupshtina.html'));
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//handling upload page form
router.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm();
  var siFile = true;
  form.parse(req, function (err, fields, files){
    //console.log('trying to upload');
    console.log('upload recived');
  });

  form.on('field', function(name, field) {
    //console.log('Got a field:', field);
    //console.log('Got a field name:', name);
    village = field;
    //console.log('village: ' + village);
    right_loc = new_location + village + '/to_review';
    tmp_img = new_location + village + '/tmp_img';
  });

      /* this is where the renaming happens */
  form.on ('fileBegin', function(name, file){
        var fileType = path.extname(file.name);
        //console.log(fileType);
        if(fileType == ""){
          console.log("NO FILE");
          siFile = false;
        }
        if(siFile){
          //console.log('filebegin here');
          if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' ) || (fileType == '.JPG' ) || (fileType == '.JPEG' ) || (fileType == '.PNG' )){
            fsExtra.ensureDirSync(right_loc);
            fsExtra.ensureDirSync(tmp_img);
            //console.log('folder exists!');
            //rename the incoming file to the file's name
              file.path = path.join(tmp_img + '/' + uniqid() + fileType);
              //for thumbnails
              if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' ) || (fileType == '.JPG' ) || (fileType == '.JPEG' ) || (fileType == '.PNG' )){
                tothumbSRC.push(file.path);
                tothumbDST.push(file.path.replace(/tmp_img/gi, path.join("tmb/to_rev"))); 
                imgDST.push(file.path.replace(/tmp_img/gi, path.join("to_review"))); 
              }
          }else if((fileType == '.mp4' ) || (fileType == '.m4v' ) || (fileType == '.MP4' ) || (fileType == '.M4V' ) || (fileType == '.MOV' ) || (fileType == '.mov' ) || (fileType == '.mkv' ) || (fileType == '.avi' ) ||  (fileType == '.MKV' ) || (fileType == '.AVI' )){
            fsExtra.ensureDirSync(right_loc);
            file.path = path.join(right_loc + '/' + uniqid() + fileType);
          }else{
          var exists3 = fs.existsSync(invalid_up_loc);
            if(exists3){
              //console.log('folder exists!');
              file.path = invalid_up_loc + '/' + uniqid() + fileType;
            }else{
              //console.log('folder does not exists');
              //console.log('making that directory');
              fsExtra.mkdir(invalid_up_loc);
              file.path = invalid_up_loc + '/' + uniqid() + fileType;
            }
        }
      }
});

  form.on('end', function(fields, files) {
    var finito = false;
    if(siFile){
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
        //creating thumbnails and autorotated images
        if(tothumbSRC.length != 0){
          for(var i = 0;i<tothumbSRC.length;i++){
            sharp(tothumbSRC[i])
              .rotate()
              .resize(200, 200)
              .max()
              .toFile(tothumbDST[i], (err, info) => {
                if(err){
                  console.log(err);
                }else{
                  console.log("thumbnail created")
                }           
              })

            sharp(tothumbSRC[i])
              .rotate()
              .toFile(imgDST[i], (err, info) => {
                if(err){
                  console.log(err);
                }else{
                  console.log("image autorotated")
                }
              })
              console.log(i + " " + finito);
              //console.log("thumbnail for " + tothumbSRC[i] + " created in " + tothumbDST[i]);
              toDelete.push(tothumbSRC[i]);
          } 
        }
        //res
        console.log("uploaded successfully");
        res.redirect('/upload_succ');
      }
      else{
        //res
        console.log("no files to be uploaded");
        res.redirect('/');
      }        
        });
    tothumbSRC = [];
    tothumbDST = [];
    imgDST = [];
});
//---------------------------------------------------------------------------------------------------------------------------------------
//handling people say page form
router.post('/peopleSay', function (req, res) {
  var utente_nome = req.body.nome;
  var utente_cognome = req.body.cognome;
  var utente_data = formatDate(new Date());
	var utente_message = req.body.message;
	file_a.id = file_a.id +1;
	file_a.users.unshift({
		nome: utente_nome,
    cognome: utente_cognome,
    data: utente_data,
		message: utente_message,
		id: file_a.id
	})
	// update json
	fs.writeFile('./data.json', JSON.stringify(file_a, null, 2), 'utf-8', function(err) {
		if (err) throw err;
		console.log('Succesfully added message from ' + utente_nome + ' ' + utente_cognome + ' on ' + utente_data);
	})
  console.log("success!");
  res.redirect('/peopleSay');
});
//---------------------------------------------------------------------------------------------------------------------------------------
//delete mesage from database
router.get("/peopleSayEdit/:id",function(req,res){
	var reply;
  var id = Number(req.params.id);
	var index = file_a.users.findIndex(function(item, i){
	  return item.id=== id;
	});
	if(index<0){
		reply = 'message not found';
		console.log(reply);
	}
	else{
      var utente_nome = file_a.users[index].nome;
      var utente_cognome = file_a.users[index].cognome;
		file_a.users.splice(index,1);
		fs.writeFile('./data.json', JSON.stringify(file_a, null, 2), 'utf-8', function(err) {
			if (err) throw err;
			console.log('Succesfully deleted message from ' + utente_nome + ' ' + utente_cognome);
		})
	}
	res.redirect("/peopleSayEdit");
});

//---------------------------------------------------------------------------------------------------------------------------------------
//handling manager page form
router.post('/1234v_manager', function (req, res) {
  var decision = req.body.sub;
  console.log("decision: " + req.body.sub);
  if(req.body.p){
    lista = req.body.p;
  }else{
    lista = req.body.d;
  }
  //console.log("lista: " + lista);
  var a = JSON.stringify(lista);
  //console.log("a = " + JSON.stringify(lista));
  var comma = ',';
  var l = splitString(a,comma);
  //console.log("array l: " + l);
  //console.log("array l has " + l.length + " elements");
  if(decision == 'pub'){
    for(var j=0;j<l.length;j++){
      var da = path.join(public_path + l[j]);
      var a = da.replace(/to_review/gi, "img");
      if((path.extname(l[j]) == '.jpg') || (path.extname(l[j]) == '.jpeg') || (path.extname(l[j]) == '.png')){
        var tmbda = path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/to_rev")));
        var tmba = path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/published")));
        //console.log("before moving thumbnail----------------------------");
        //console.log("tmbda = " + tmbda);
        //console.log("tmba = " + tmba);
        //moving thumbnail to published folder if image (tmb/published)
        fsExtra.move(tmbda, tmba, err =>{
          if (err){
            return console.log("errore spostamento thumbnail da to_rev a publishe: " + err);
          }else{
            console.log("thumbnail moved");
          }
        });
      }
      //console.log("before moving something else----------------------------");
      //console.log("da = " + da);
      //console.log("a = " + a);
      //moving HD picture or video to published folder (img)
      fsExtra.move(da, a, err =>{
        if (err){
          return console.log("errore spostamento file da to_review a img: " + err);
        }else{
          console.log("file published"); 
        }
      });
    }
  }else if(decision == 'del'){
    for(var j=0;j<l.length;j++){
      console.log("ready to delete: " + path.join(public_path + l[j]));
      if((path.extname(l[j]) == '.jpg') || (path.extname(l[j]) == '.jpeg') || (path.extname(l[j]) == '.png')){
        fsExtra.remove(path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/to_rev"))), err =>{
          if (err){
            return console.log("errore rimozione thumbnail da to_rev: " + err);
          }else{
            console.log("thumbnail removed from to_rev"); 
          }
        });
      }
      fsExtra.remove(path.join(public_path + l[j]), err =>{
        if (err){
          return console.log("errore rimozione file da to_review: " + err);
        }else{
          console.log("file deleted from to_review"); 
        }
      });
    }
  }else if(decision == 'delPub'){
    for(var j=0;j<l.length;j++){
      //console.log("ready to delete: " + path.join(public_path + l[j]));
      if((path.extname(l[j]) == '.jpg') || (path.extname(l[j]) == '.jpeg') || (path.extname(l[j]) == '.png')){
        fsExtra.remove(path.join(public_path + l[j].replace(/img/gi, path.join("tmb/published"))), err =>{
          if (err){
            return console.log("errore rimozione thumbnail da published: " + err);
          }else{
            console.log("thumbnail removed from published"); 
          }
        });
      }
      fsExtra.remove(path.join(public_path + l[j]), err =>{
        if (err){
          return console.log("errore rimozione file da img: " + err);
        }else{
          console.log("file deleted from img");
        }
      });
    }
  }
  lista = [];
  res.redirect("/");
});

  module.exports = router;