var progressBar = document.getElementById("progress"),
  loadBtn = document.getElementById("buttoon"),
  display = document.getElementById("display"),
  inputFile = document.getElementById("myFile");

function upload(data) {
  if ('files' in inputFile) {
    for (var i = 0; i < inputFile.files.length; i++) {
      console.log(inputFile.files[i]);
    }
  }
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://zinoui.com/demo/progress-bar/upload.php", true);
  if (xhr.upload) {
    xhr.upload.onloadstart = function(e) {
      progressBar.style.width = "0%";
      display.innerText = '0%';
      console.log("on load start");
    }
    xhr.upload.onprogress = function(e) {
      if (e.lengthComputable) {
        //progressBar.max = e.total;
        progressBar.style.width = Math.floor((e.loaded / e.total) * 100) + '%';
        display.innerText = Math.floor((e.loaded / e.total) * 100) + '%';
        console.log("progress" + Math.floor((e.loaded / e.total) * 100) + '%');
      }
    }
    xhr.upload.onloadend = function(e) {
      progressBar.style.width = "100%";
      console.log("on load end");
    }
  }
  xhr.send(data);
}

function buildFormData() {
  var inputFile = document.getElementById("myFile");
  //var fd = new FormData();
  if ('files' in inputFile) {
    for (var i = 0; i < inputFile.files.length; i++) {
      fd.append('data[]',inputFile.files[i]);
    }
    console.log(fd);
    return fd;
  }
}

loadBtn.addEventListener("click", function(e) {
  upload(inputFile.files);
  //upload(buildFormData());
});