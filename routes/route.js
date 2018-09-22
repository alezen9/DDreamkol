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
//const nodemailer = require('nodemailer');
//const xoauth2 = require('xoauth2');
const cookieParser = require('cookie-parser');
router.use(cookieParser());

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
        "id": 0,
			};
}

// functions -------------------------------------------------------------------------------------------------------------------------------------
// return all pitures from a village by folder TEAMS
function getTeamPics(team){
  var pics = {
    'anni': []
  };
  var paese = team;
  var testFolder2 = path.join(new_location + 'turnir/teams/' + paese + '/tmb');
  fsExtra.ensureDirSync(testFolder2);
  var testFolder = new_location + 'turnir/teams/' + paese + '/years/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      var tmb_god = path.join(testFolder2 + "/" + file);
      fsExtra.ensureDirSync(tmb_god);
      var lista_foto = [];
      var lista_tmb = [];
      lista_foto.push(file);
      fs.readdirSync(testFolder + file + '/').forEach(file2=>{
        if(!(fs.existsSync(path.join(tmb_god + "/" + file2)))){
          sharp(testFolder + file + "/" + file2)
          .rotate()
          .resize(300, 300)
          .max()
          .toFile(tmb_god + "/" + file2, (err, info) => {
            if(err){
              console.log(err);
            }          
          })
        }
        //lista_foto.push(file2);
        lista_foto.push('images/turnir/teams/' + team + '/years/' + file + '/' + file2);
        lista_tmb.push('images/turnir/teams/' + team + '/tmb/' + file + '/' + file2);
      });
      pics.anni.push({
        lista_foto,
        lista_tmb
      });
    }
  });
  return(pics);
}


//send email (subject)
/*
function sendEmail(subj,text){
  var transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    auth: {
      xoauth2: xoauth2.createXOAuth2Generator({
        user: 'agjoreski65@gmail.com',
        clientId: '940157088770-e4uvdlafnma777iocu4497bn9qjm9la9.apps.googleusercontent.com',
        clientSecret: 'VsvT70VttzXO01_hHPY2WvH9',
        refreshToken: ''
      })
    }
  });
  var mailOptions = {
    from: '"Aleksandar Gjoreski" <ddreamkol@gmail.com',
    to: 'ddreamkol@gmail.com',
    subject: subj,
    text: text
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      //console.log('Email sent: ' + info.response);
    }
  });
}
*/

// format date
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

//from json array returns actual array
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

//loading pictures for village manager page
function vmanager_load(imgFolder,trFolder,ps,list_pics1,list_ext1,list_ext21,list_to_review1,listtmbpub1, listtmbdel1){
  // publicated images
  fs.readdirSync(imgFolder).forEach(file=>{
    if(file != gitkeep){
      if((path.extname(file) == '.mp4') || (path.extname(file) == '.MP4')){
        listtmbpub1.push('images/other/video3.svg');
      }else{
        listtmbpub1.push('images/' + ps + '/tmb/published/' + file);
      }
      list_pics1.push('images/' + ps + '/img/' + file);
      list_ext21.push(path.extname(file));
    }
  });
  
  // to review images and extensions
  fs.readdirSync(trFolder).forEach(file=>{
    if(file != gitkeep){
      if((path.extname(file) != '.mp4') && (path.extname(file) != '.MP4') && (path.extname(file) != '.mov') && (path.extname(file) != '.MOV') && (path.extname(file) != '.m4v') && (path.extname(file) != '.M4V') && (path.extname(file) != '.mkv') && (path.extname(file) != '.MKV') && (path.extname(file) != '.avi') && (path.extname(file) != '.AVI')){
        listtmbdel1.push('images/' + ps + '/tmb/to_rev/' + file);
      }else{
        listtmbdel1.push('images/other/video3.svg');
      }
      list_to_review1.push('images/' + ps + '/to_review/' + file);
      list_ext1.push(path.extname(file));
    }
  }); 
}

//capitalize words in string
var toTitleCase = function (str) {
	str = str.toLowerCase().split(' ');
	for (var i = 0; i < str.length; i++) {
		str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
	}
	return str.join(' ');
}

//load images pic page
function picPage(imeSelo,list_pics1,list_ext1,listtmb1){
  var testFolder = new_location + imeSelo + '/img/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      if((path.extname(file) == '.mp4') || (path.extname(file) == '.MP4')){
        listtmb1.push('images/other/video3.svg');
      }else{
        listtmb1.push('images/' + imeSelo + '/tmb/published/' + file);
      }
      list_pics1.push('images/' + imeSelo + '/img/' + file);
      list_ext1.push(path.extname(file));
    }
  });
}

// functions end -------------------------------------------------------------------------------------------------------------------------------------
//global variables---------------------------------------------------------------------------------------------------------------------------
const lc = path.join(__dirname + '/..');                             // DDreamkol path
const new_location = lc + '/public/images/';                         // images location
const invalid_up_loc = path.join(lc + '/upload_invalid');            // upload_invalid location
var selo = "";                                                       // used in vmanager and manage/:a
var public_path = path.join(lc + "/public/");                        // public location
var toDelete = [];                                                   // images to delete from tmp_img
var picRoutes = ['/bezevo_pic','/borovec_pic','/drenok_pic','/d_lukovo_pic','/g_lukovo_pic','/jablanica_pic','/lakavica_pic','/modrich_pic','/nerezi_pic','/piskupshtina_pic'];
var infoRoutes = ['/bezevo_h','/borovec_h','/drenok_h','/d_lukovo_h','/g_lukovo_h','/jablanica_h','/lakavica_h','/modrich_h','/nerezi_h','/piskupshtina_h'];
var teamsRoutes = ['/bezevo_team','/boroec_team','/drenok_team','/d_lukovo_team','/g_lukovo_team','/jablanica_team','/lakaica_team','/modrich_team','/nerezi_team','/piskupshtina_team'];

// orari bus
var or_bezevo = ["05:50","08:05","12:00","14:30","16:30","18:35","06:10","13:00","18:30","~810m","~55 (2002)","walk","Nerezi","Нерези"];
var or_borovec = ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","~948m","~679 (2002)","na"];
var or_drenok = ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","~1080m","~2 (2002)","na"];
var or_d_lukovo = ["06:05","08:25","12:15","14:50","16:50","18:55","06:30","13:15","18:50","~705m","~400 (2002)","si","at \"na most\"","на мост"];
var or_g_lukovo = ["05:50","08:05","12:00","14:30","16:30","18:35","06:10","13:00","18:30","~940m","~55 (2002)","walk","D. Lukovo","Д. Луково"];
var or_jablanica = ["08:00","13:00","17:00","20:00","-","-","-","-","-","~1087m","~553 (2002)","na"];
var or_lakavica = ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","~1244m","~3 (2002)","na"];
var or_modrich = ["00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","00:00","~880m","~25 (2002)","na"];
var or_nerezi = ["05:50","08:05","12:00","14:30","16:30","18:35","06:10","13:00","18:30","~870m","~120 (2002)","si","at Vodoac - center","на Водоач - центар"];
var or_piskupshtina = ["05:40","07:50","11:45","14:20","16:20","18:25","06:00","12:45","18:20","~687m","~182 (2002)","si","center","центар"];

// geo coordinates
const geoC = [
  //bezevo
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53810.482046397534!2d20.580565690235638!3d41.325597073387556!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511dcd2cec7351%3A0x53e8f057a932549b!2sBezovo%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569336233",
  //boroec
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d50722.38137281392!2d20.584286596360673!3d41.29519591171799!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1350e20bc8eec5f5%3A0x223a354e484494c1!2sBoroec%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569408352",
  //drenok
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52242.03849071052!2d20.53587285320215!3d41.371149531761475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511b73a5c1a6b1%3A0xb5d1a30e63b2239!2sDrenok%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569675504",
  //d_lukovo
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51607.58888572925!2d20.575499737699797!3d41.34402701335433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511c1a0bc698f7%3A0xe7fdc103c83d7b74!2sLukovo%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569225947",
  //g_lukovo
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d51607.58888572925!2d20.575499737699797!3d41.34402701335433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511c1a0bc698f7%3A0xe7fdc103c83d7b74!2sLukovo%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569225947",
  //jablanica
  "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d95988.24678827428!2d20.6707487!3d41.2515578!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511da144d64ecd%3A0x791228c1ea01a42e!2sJablanica%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529566625248",
  //lakajca
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d23945.4613892491!2d20.54853009394057!3d41.3237592108173!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511d3778f7c7f5%3A0x466ae3aed7353204!2sLakaica%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529569985022",
  //modrich
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52249.37282088545!2d20.530601735863105!3d41.36201550219177!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511c7df158799d%3A0x178870435162e319!2sModrich%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529568666056",
  //nerezi
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52279.92001666508!2d20.57497173451212!3d41.32395482444828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511c30b9262653%3A0xae260f1f5f06cfdf!2sNerezi%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529568849489",
  //piskupshtina
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d53829.0202346331!2d20.5937780609622!3d41.3031439803666!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13511dd1c6ed408f%3A0x89e3eaa3e750e635!2sPiskupshtina%2C+Macedonia+(FYROM)!5e0!3m2!1sit!2sit!4v1529568987162"
]

//--------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
// apis
// return all pitures from a village by folder
router.get("/api/ddis/:s", (req, res) => {
  var pics = {
    'anni': []
  };
  var paese = req.params.s;
  var testFolder2 = path.join(new_location + 'turnir/teams/' + paese + '/tmb');
  fsExtra.ensureDirSync(testFolder2);
  var testFolder = new_location + 'turnir/teams/' + paese + '/years/';
  fs.readdirSync(testFolder).forEach(file=>{
    if(file != gitkeep){
      var tmb_god = path.join(testFolder2 + "/" + file);
      fsExtra.ensureDirSync(tmb_god);
      var lista_foto = [];
      lista_foto.push(file);
      fs.readdirSync(testFolder + file + '/').forEach(file2=>{
        if(!(fs.existsSync(path.join(tmb_god + "/" + file2)))){
          sharp(testFolder + file + "/" + file2)
          .rotate()
          .resize(300, 300)
          .max()
          .toFile(tmb_god + "/" + file2, (err, info) => {
            if(err){
              console.log(err);
            }          
          })
        }
        lista_foto.push(file2);
      });
      pics.anni.push({
        lista_foto
      });
    }
  });
  res.status(200).send(JSON.stringify(pics));
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route homepage
router.get("/", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_homepage.html'));
  }else{
    res.sendFile(path.join(public_path + 'homepage.html')); 
  }
});

//route news page
router.get("/news", (req, res) => {
  res.sendFile(path.join(public_path + 'news.html'));
});

//route tac page
router.get("/tac", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_tac.html'));
  }else{
    res.sendFile(path.join(public_path + 'tac.html')); 
  }
});

//route about dolni drimkol page
router.get("/dolnidrimkol", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_about_dd.html'));
  }else{
    res.sendFile(path.join(public_path + 'about_dd.html')); 
  }
});

//route about us page
router.get("/about_us", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_about_us.html'));
  }else{
    res.sendFile(path.join(public_path + 'about_us.html')); 
  }
});

//route gorno lukovo turnir page
router.get("/ddis", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_tournament_glukovo.html'));
  }else{
    res.sendFile(path.join(public_path + 'tournament_glukovo.html')); 
  }
});

//route upload page
router.get("/upload", (req, res) => {
  var lingua = req.cookies.idioma;
  if((!lingua) || (lingua == "mkd")){
    res.sendFile(path.join(public_path + 'mk_upload.html'));
  }else{
    res.sendFile(path.join(public_path + 'upload.html')); 
  }
});


//route people say page
router.get("/peopleSay", (req, res) => {
  var titolo,subTitolo,fname,sname,testo,submit,poraki,noPoraki,testoP,nota,nota1,warning;
  var lingua;
  if(req.cookies.idioma){
    lingua = req.cookies.idioma;
  }else{
    lingua = "mkd";
  }
  if(lingua == "eng"){
    nota = "Note"
    nota1 = "Use this page to express yourself, if you want to share a tought about Dolni Drimkol this is the right place, just post a message";
    warning = "Insults and/or bad behavior is strictly forbidden, the message/s will be deleted and we will take apporpriate measures";
    titolo ="Just say it!";
    subTitolo = "Submit a message to the community";
    fname = "First name";
    sname = "Last name";
    testo = "Text";
    testoP = "Text here";
    submit = "Submit message";
    poraki = "Messages";
    noPoraki = "No messages yet";
  }else{
    nota = "Внимание"
    nota1 = "Целта на странава е споделување на размислувања, факти, пораки односно се она што може да биде во текстуална форма... Тука зборот е на вас!";
    warning = "Секаков вид на навреди е строго забранет, пораката ќе биде веднаш избришана и уредувачите ке преземаат соодветни мерки";
    titolo ="Искажи се!";
    subTitolo = "Постирај порака";
    fname = "Име";
    sname = "Презиме";
    testo = "Текст";
    testoP = "Текст овде";
    submit = "Постирај";
    poraki = "Пораки";
    noPoraki = "Нема пораки";
  }
  var reply2 = file_a.users;
  res.render("peopleSay",{
    jazik: lingua,
    reply: reply2,
    titolo1: titolo,
    subTitolo1: subTitolo,
    fname1: fname, 
    sname1: sname, 
    testo1: testo, 
    submit1: submit, 
    poraki1: poraki, 
    noPoraki1: noPoraki, 
    testoP1: testoP,
    nota: nota,
    nota1: nota1,
    warning: warning
  });
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
  var paesi = ["bezevo","borovec","drenok","d_lukovo","g_lukovo","jablanica","lakavica","modrich","nerezi","piskupshtina"];
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
  var list_pics = [];
  var list_to_review = [];
  var list_ext2 = [];
  var list_ext = [];
  var listtmbdel = [];
  var listtmbpub = [];
  
  vmanager_load(testFolder,toReviewFolder,selo,list_pics,list_ext,list_ext2,list_to_review,listtmbpub, listtmbdel);

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
  selo = "";
  toDelete = [];
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//teams routes
router.get(teamsRoutes, (req, res) => {
  var nomePaese = req.originalUrl.slice(1, -5);
  var lingua;
  var nomePaeseCap;
  var sela = ["bezevo","boroec","drenok","jablanica","lakavica","modrich","nerezi","piskupshtina"];
  var selaK = ["Безево","Бороец","Дренок","Јабланица","Лакаица","Модрич","Нерези","Пискупштина"];
  if(req.cookies.idioma){
    lingua = req.cookies.idioma;
  }else{
    lingua = "mkd";
  }
  if(nomePaese == "g_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Gorno Lukovo";
    }else{
      nomePaeseCap = "Горно Луково";
    }
  }else if(nomePaese == "d_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Dolno Lukovo";
    }else{
      nomePaeseCap = "Долно Луково";
    }
  }else{
    if(lingua == "eng"){
      nomePaeseCap = toTitleCase(nomePaese);
    }else{
      for(var i=0; i<sela.length; i++){
        if(sela[i] == nomePaese){
          nomePaeseCap = selaK[i];
        }
      }
    }
  }
  var mainYear, mainPic,fotoDesc, nTitles, yearsTitles,yearsGallery = [];
  if(lingua == "mkd"){
    fotoDesc = "Анѓелкоски Ристе, Ѓорески Наумче, Раткушиноски Зоран, Нелчески Бојан, Башоски Саше, Алачкоски Борче, Бајчески Јован, Ферукоски Денис, Маркоски Бојан  -  Мареноски Димитар, Карајованоски Ристе, Ѓорески Александар, Раткушиноски Душко, Филкоски Теодор, Карајваноски Дарко";
    nTitles = "8 Титули";
  }else{
    fotoDesc = "Angjelkoski Riste, Gjoreski Naumche, Ratkushinoski Zoran, Nelcheski Bojan, Bashoski Sashe, Alackoski Borche, Bajcheski Jovan, Ferukoski Denis, Markoski Bojan  -  Marenoski Dimitar, Karajovanoski Riste, Gjoreski Aleksandar, Ratkushinoski Dushko, Filkoski Teodor, Karajovanoski Darko";
    nTitles = "8 Titles";
  }
  mainYear = 2018;
  mainPic = path.join("images/turnir/teams/" + nomePaese + "/2018.jpg");
  firstTitle = 1983;
  lastTitle = 2016;
  yearsTitles = ["2015","2008","2007","2001","2000","1998"];
  var data = getTeamPics(nomePaese);
  data.anni.slice().reverse().forEach(element => {
    yearsGallery.push(element.lista_foto.shift());
  });
  /*
  res.sendFile(path.join(public_path + 'team_nerezi.html'));
  */
  res.render("teams", {
    nome: nomePaeseCap,
    mainYear: mainYear,
    mainPic: mainPic,
    fotoDesc: fotoDesc,
    nTitles: nTitles,
    lastTitle: lastTitle,
    firstTitle: firstTitle,
    yearsTitles: yearsTitles,
    yearsGallery: yearsGallery,
    data: data.anni.slice().reverse(),
    jazik: lingua
  });
})

//route pic pages
router.get(picRoutes, (req, res) => {
  var nomePaese = req.originalUrl.slice(1, -4);
  var nomePaeseCap;
  var sela = ["bezevo","drenok","jablanica","lakavica","modrich","nerezi","piskupshtina"];
  var selaK = ["Безево","Дренок","Јабланица","Лакавица","Модрич","Нерези","Пискупштина"]
  var infoPagina = "/" + nomePaese + "_h";
  var lingua;
  var list_pics = [];
  var list_ext = [];
  var listtmb = [];
  if(req.cookies.idioma){
    lingua = req.cookies.idioma;
  }else{
    lingua = "mkd";
  }
  if(nomePaese == "g_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Gorno Lukovo";
    }else{
      nomePaeseCap = "Горно Луково";
    }
  }else if(nomePaese == "d_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Dolno Lukovo";
    }else{
      nomePaeseCap = "Долно Луково";
    }
  }else if(nomePaese == "borovec"){
    if(lingua == "eng"){
      nomePaeseCap = "Boroec";
    }else{
      nomePaeseCap = "Бороец";
    }
  }else if(nomePaese == "lakavica"){
    if(lingua == "eng"){
      nomePaeseCap = "Lakaica";
    }else{
      nomePaeseCap = "Лакаица";
    }
  }else{
    if(lingua == "eng"){
      nomePaeseCap = toTitleCase(nomePaese);
    }else{
      for(var i=0; i<sela.length; i++){
        if(sela[i] == nomePaese){
          nomePaeseCap = selaK[i];
        }
      }
    }
  }
  var infobtn, noPics;
  if(lingua == "mkd"){
    infobtn = "Инфо";
    noPics = "Нема слики. Кликни на 'Прикачи' копчето за придонес.";
  }else{
    infobtn = "Go to info";
    noPics = "No pictures yet, click the 'Upload' button to contribute";
  }
  picPage(nomePaese,list_pics,list_ext,listtmb);
  res.render("pic_page",{jazik: lingua,nome: nomePaeseCap,h_page: infoPagina,arr: list_pics,arrext: list_ext, arrtmb: listtmb,ii: infobtn, noPics: noPics});
});
//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//route info pages
router.get(infoRoutes, (req, res) => {
  var pcode = "6337";
  var lingua;
  var i = infoRoutes.indexOf(req.originalUrl);
  var coordinata = geoC[i];
  var nomePaese = req.originalUrl.slice(1, -2);
  var nomePaeseCap;
  var sela = ["bezevo","drenok","jablanica","modrich","nerezi","piskupshtina"];
  var selaK = ["Безево","Дренок","Јабланица","Модрич","Нерези","Пискупштина"]
  var pic_ref1 = "/" + nomePaese + "_pic";

  if(req.cookies.idioma){
    lingua = req.cookies.idioma;
  }else{
    lingua = "mkd";
  }
  if(nomePaese == "g_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Gorno Lukovo";
    }else{
      nomePaeseCap = "Горно Луково";
    }
  }else if(nomePaese == "d_lukovo"){
    if(lingua == "eng"){
      nomePaeseCap = "Dolno Lukovo";
    }else{
      nomePaeseCap = "Долно Луково";
    }
  }else if(nomePaese == "borovec"){
    if(lingua == "eng"){
      nomePaeseCap = "Boroec";
    }else{
      nomePaeseCap = "Бороец";
    }
  }else if(nomePaese == "lakavica"){
    if(lingua == "eng"){
      nomePaeseCap = "Lakaica";
    }else{
      nomePaeseCap = "Лакаица";
    }
  }else{
    if(lingua == "eng"){
      nomePaeseCap = toTitleCase(nomePaese);
    }else{
      for(var i=0; i<sela.length; i++){
        if(sela[i] == nomePaese){
          nomePaeseCap = selaK[i];
        }
      }
    }
  }
  var bus,from,to,lavorativi,festivi,where,x,y,z,geo,cultural,history,pics;
  if(lingua == "eng"){
    bus = "Bus";
    if(nomePaeseCap == "Gorno Lukovo"){
      from = "G. Lukovo";
    }else if(nomePaeseCap == "Dolno Lukovo"){
      from = "D. Lukovo";
    }else{
      from = nomePaeseCap; 
    }
    if((eval("or_" + nomePaese)[11] == "si") || (eval("or_" + nomePaese)[11] == "walk")){
      where = eval("or_" + nomePaese)[12];
    }else{
      where = "N/A";
    }
    if(nomePaeseCap == "Jablanica"){
      lavorativi = "Everyday";
      festivi = "";
    }else{
      lavorativi = "Mon - Sat";
      festivi = "Sun / Hol";
    }
    to = "Struga"
    x = "Altitude";
    y = "Population"
    z = "Postal code";
    pics = "See the pictures";
    geo = "Geographical characteristichs";
    cultural = "Cultural-Historical features";
    history = "A bit of history";
  }else{
    bus = "Бус";
    if(nomePaeseCap == "Горно Луково"){
      from = "Г. Луково";
    }else if(nomePaeseCap == "Долно Луково"){
      from = "Д. Луково";
    }else{
      from = nomePaeseCap; 
    }
    if((eval("or_" + nomePaese)[11] == "si") || (eval("or_" + nomePaese)[11] == "walk")){
      where = eval("or_" + nomePaese)[13];
    }else{
      where = "N/A";
    }
    if(nomePaeseCap == "Јабланица"){
      lavorativi = "Секојдневно";
      festivi = "";
    }else{
      lavorativi = "Пон - Саб";
      festivi = "Нед / Прз";
    }
    to = "Струга";
    x = "Висина";
    y = "Население"
    z = "П. Број.";
    pics = "Види ги сликите";
    geo = "Географски карактеристики";
    cultural = "Културно-Исторички Одлики";
    history = "Малку историја";
  }

  res.render("info_page",{
    jazik: lingua,
    paese: nomePaeseCap,
    pic_ref:  pic_ref1,
    bus: bus,
    from: from,
    to: to,
    lavorativi: lavorativi,
    festivi: festivi,
    orari: eval("or_" + nomePaese),
    where: where,
    pics: pics,
    x: x,
    x1: eval("or_" + nomePaese)[9],
    y: y,
    y1: eval("or_" + nomePaese)[10],
    z: z,
    z1: pcode,
    geo: geo,
    coordinata: coordinata,
    cultural: cultural,
    history: history,
    folderName: nomePaese
  });
});

//--------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------------------------------------------
//handling upload page form
router.post('/upload', function (req, res) {
  var form = new formidable.IncomingForm();
  var siFile = true;
  var village;
  var tothumbSRC = [];
  var tothumbDST = [];
  var imgDST = [];
  var tmp_img;
  var right_loc;
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
          .resize(300, 300)
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
      /*var text = "New upload for " + village;
      var subj = "New upload";
      sendEmail(subj,text);*/
    }else{
      //res
      console.log("no files to be uploaded");
      res.redirect('/');
    }        
  });
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
    id: file_a.id,
    cancella: "http://80.211.7.75:3000/peopleSayEdit/" + file_a.id
	})
	// update json
	fs.writeFile('./data.json', JSON.stringify(file_a, null, 2), 'utf-8', function(err) {
		if (err) throw err;
		console.log('Succesfully added message from ' + utente_nome + ' ' + utente_cognome + ' on ' + utente_data);
	})
  console.log("success!");
  /*var text = utente_nome + " - " + utente_cognome + ": " + utente_message;
  var subj = "New message";
  sendEmail(subj,text);*/
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
  var lista = [];
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
  res.redirect("/");
});

  module.exports = router;