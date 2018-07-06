var acceptedFormats = ["jpg","jpeg","png","mp4","m4v","mov","mkv","avi"];
var flagOK = true;

function spinner() {
    var circleDiv = document.getElementById("upl");
    var spanSubmitButton = document.getElementById("btn_span");
    circleDiv.style.display = "block";
    spanSubmitButton.innerHTML = "Uploading...";
}


function getFileExtension(filename) {
    return filename.split('.').pop();
}

function myFunction(){
    var inputFile = document.getElementById("myFile");
    var p = document.getElementById("warning");
    var pExt = document.getElementById("warningExtension");
    var spanInputFiles = document.getElementById("chsFiles");
    var totSize = 0;
    var totEl = inputFile.files.length;
    if ('files' in inputFile) {
        for (var i = 0; i < inputFile.files.length; i++) {
            var file = inputFile.files[i];
            var fileExt = getFileExtension(file.name).toLowerCase();
            if(!acceptedFormats.includes(fileExt)){
                flagOK = false;
            }else{
                flagOK = true;
            }
            totSize += file.size;
            //txt += "<strong> -" + file.name + "</strong><span>" + file.size + "</span><br>";
        }
    }/*else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + inputFile.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }*/
    totSize = totSize/(1024*1024);
    var f = (inputFile.files.length == 1) ? "file" : "files";
    //var txt = "<strong>" + totEl + " " + f + " to upload with total size of " + Math.ceil(totSize) + "mb</strong>";
    //p.style.border = "3px solid rgba(255,213,130,0.46)";
    //p.innerHTML = txt;
    spanInputFiles.innerHTML = totEl + " " + f + " ready -  " + Math.ceil(totSize) + "mb";
    if(totSize>30){
        p.style.display = "block";
    }
    if(!flagOK){
        document.querySelector("#buttoon").disabled = true;
        pExt.style.display = "block";
    }else{
        document.querySelector("#buttoon").disabled = false;
        pExt.style.display = "none";
    }
}