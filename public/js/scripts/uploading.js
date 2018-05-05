function spinner() {
    var x = document.getElementById("upl");
    var y = document.getElementById("sub_btn");
    var z = document.getElementById("btn_span");
    x.style.display = "block";
    z.innerHTML = "Uploading...";
}

function myFunction(){
    var x = document.getElementById("myFile");
    var y = document.getElementById("filesToUpload");
    var totSize = 0;
    var totEl = x.files.length;
    if ('files' in x) {
        for (var i = 0; i < x.files.length; i++) {
            var file = x.files[i];
            totSize += file.size;
            //txt += "<strong> -" + file.name + "</strong><span>" + file.size + "</span><br>";
        }
    }else {
        txt += "The files property is not supported by your browser!";
        txt  += "<br>The path of the selected file: " + x.value; // If the browser does not support the files property, it will return the path of the selected file instead. 
    }
    totSize = totSize/(1024*1024);
    var f = (x.files.length == 1) ? "file" : "files";
    var txt = "<strong>" + totEl + " " + f + " to upload with total size of " + Math.ceil(totSize) + "mb</strong>";
    y.style.border = "3px solid rgba(255,213,130,0.46)";
    document.getElementById("filesToUpload").innerHTML = txt;
}