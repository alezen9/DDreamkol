const express = require('express');
const router = express.Router();
const path = require('path'); 
const fs = require('fs');
const formidable = require('formidable');
const pug = require('pug');
const util = require('util');
const hbjs = require('handbrake-js');
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




function converti(fileLocation){
  hbjs.spawn({input: path.join(fileLocation), output: path.join(fileLocation + '.mp4')})
  .on('begin', begin =>{
    
    console.log("conversione iniziata");
  })
  .on('error', err => {
    // invalid user input, no video found etc
    console.log("error converting " + err);
  })
  .on('progress', progress => {
      console.log('converting file: %s',progress.percentComplete)
  })/*
  .on('complete', complete =>{
    hbjs.exec({ input: path.join(fileLocation + '.mp4'), output: path.join(fileLocation + 'rotated' + '.mp4'), rotate: 4, optimize: true }, function(err, stdout, stderr){
      if (err) throw err
      console.log('stdout')
    })
  })*/
  .on('end', end =>{
    console.log("conversione finita");
    fs.unlinkSync(fileLocation);
    console.log("original deleted");
  })
};


// functions end -------------------------------------------------------------------------------------------------------------------------------------
//global variables---------------------------------------------------------------------------------------------------------------------------
var lc = path.join(__dirname + '/..');                              // DDreamkol path
var new_location = lc + '/public/images/';                          // images location
var invalid_up_loc = path.join(lc + '/upload_invalid');             // upload_invalid location
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
  res.render("upload");
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


//route manager
router.get("/manager", (req, res) => {

  var paesi = ["bezevo","borovec","drenok","d_lukovo","g_lukovo","jablanica","lakavica","modric","nerezi","piskupshtina"];
  var indice;
  var count = [];
  var contatore = 0;
  for(indice=0;indice<10;indice++){
    var testFolder6 = new_location + paesi[indice] + '/to_review/';
    fs.readdirSync(testFolder6).forEach(file=>{
      if(file != gitkeep){
        contatore++;
      }
    });
    //console.log(paesi[indice] + ": " + contatore);
    count[indice] = contatore;
    contatore = 0;
  }
  res.render("manager",{array: count});
  //res.sendFile(path.join(public_path + 'manager.html'));
});

//route v_manager page
router.get("/1234v_manager", (req, res) => {
  
  var testFolder = new_location + selo + '/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      list_pics.push('images/' + selo + '/img/' + file);
      //console.log(file);
      list_ext2.push(path.extname(file));
    }
    });
    var toReviewFolder = new_location + selo + '/to_review/';
  fs.readdirSync(toReviewFolder).forEach(file=>{
    if(file != gitkeep){
      if((path.extname(file) != '.mp4') && (path.extname(file) != '.m4v') && (path.extname(file) != '.jpeg') && (path.extname(file) != '.jpg') && (path.extname(file) != '.png')){
        converti(toReviewFolder + file);
      }
      list_to_review.push('images/' + selo + '/to_review/' + file);
      //console.log(file);
      list_ext.push(path.extname(file));
    }
    });
    var tmbTo_revFolder = new_location + selo + '/tmb/to_rev/';
    fs.readdirSync(tmbTo_revFolder).forEach(file=>{
        if(file != gitkeep){
          listtmbdel.push('images/' + selo + '/tmb/to_rev/' + file);
        }
    });
    var tmbPubFolder = new_location + selo + '/tmb/published/';
    fs.readdirSync(tmbPubFolder).forEach(file=>{
        if(file != gitkeep){
          listtmbpub.push('images/' + selo + '/tmb/published/' + file);
        }
    });
  res.render("v_manager",{paese: selo, arr_rev: list_to_review, arr_pics: list_pics, arrext: list_ext2,arrext2: list_ext, arrtmbdel: listtmbdel, arrtmbpub: listtmbpub});
  list_pics = [];
  list_to_review = [];
  selo = "";
  list_ext2 = [];
  list_ext = [];
  listtmbdel = [];
  listtmbpub = [];
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
    console.log('trying to upload');
    console.log('upload recived');
  });

  form.on('field', function(name, field) {
    //console.log('Got a field:', field);
    //console.log('Got a field name:', name);
    village = field;
    //console.log('village: ' + village);
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
          console.log('filebegin here');
          if((fileType == '.jpg' ) || (fileType == '.jpeg' ) || (fileType == '.png' ) || (fileType == '.mp4' ) || (fileType == '.m4v' ) || (fileType == '.MOV' ) || (fileType == '.mov' ) || (fileType == '.mpeg' ) || (fileType == '.mpg' ) || (fileType == '.mkv' ) || (fileType == '.avi' )){
            right_loc = new_location + village + '/to_review';
            var exists = fs.existsSync(right_loc);
            if(exists){
              console.log('folder exists!');
            //rename the incoming file to the file's name
              file.path = path.join(right_loc + '/' + uniqid() + fileType);
              //for thumbnails
              tothumbSRC.push(file.path);
              tothumbDST.push(file.path.replace(/to_review/gi, path.join("tmb/to_rev")));     
            }else{
              console.log('folder does not exists');
              console.log('making that directory');
              fsExtra.mkdir(right_loc);
              file.path = path.join(right_loc + '/' + uniqid() + fileType);
              tothumbSRC.push(file.path);
              tothumbDST.push(file.path.replace(/to_review/gi, path.join("tmb/to_rev")));
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
      }
});

  form.on('end', function(fields, files) {
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
        }/*
        var testFolder8 = path.join(right_loc + '/');
        fs.readdirSync(testFolder8).forEach(file=>{
          if((file != gitkeep) && ((path.extname(file) == '.MOV' ) || (path.extname(file) == '.mov' ) || (path.extname(file) == '.mpeg' ) || (path.extname(file) == '.mpg' ) || (path.extname(file) == '.mkv' ) || (path.extname(file) == '.avi' ))){
            var filePath = path.join(right_loc  + '/' + file);
            //console.log("filePath: " + filePath);
            converti(filePath);
            //console.log("video convertito");
            //fsExtra.moveSync(path.join(filePath + ".mp4"), path.join(new_location + village + "/img/" + uniqid() + ".mp4"));
            //fs.unlinkSync(filePath);
            //console.log('removed video copy: ' + file + ' with extension: ' + path.extname(file));
          }
        });*/
        //creating thumbnails
        if(tothumbSRC.length != 0){
          for(var i = 0;i<tothumbSRC.length;i++){
            sharp(tothumbSRC[i])
              .resize(200, 200)
              .max()
              .toFile(tothumbDST[i])
              console.log("thumbnail for " + tothumbSRC[i] + " created in " + tothumbDST[i]);
          } 
        }
        //res
        console.log("success!");
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
  lista = req.body.p;
  //console.log("lista: " + lista);
  var a = JSON.stringify(lista);
  //console.log("a = " + JSON.stringify(lista));
  var l;
  var comma = ',';
  l = splitString(a,comma);
  //console.log("array l: " + l);
  //console.log("array l has " + l.length + " elements");
  if(decision == 'pub'){
    for(var j=0;j<l.length;j++){
      var da = path.join(public_path + l[j]);
      var a = da.replace(/to_review/gi, "img");
      if(path.extname(l[j]) != '.mp4'){
        var tmbda = path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/to_rev")));
        var tmba = path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/published")));
        fsExtra.moveSync(tmbda, tmba);
      }
      fsExtra.moveSync(da, a);
      console.log("file published");
    }
  }else if(decision == 'del'){
    for(var j=0;j<l.length;j++){
      console.log("ready to delete: " + path.join(public_path + l[j]));
      if(path.extname(l[j]) != '.mp4'){
        fs.unlinkSync(path.join(public_path + l[j].replace(/to_review/gi, path.join("tmb/to_rev"))));
      }
      fs.unlinkSync(path.join(public_path + l[j]));
      console.log("file deleted");
    }
  }
  l = "";
  lista = [];
  res.redirect("/");
});

  module.exports = router;