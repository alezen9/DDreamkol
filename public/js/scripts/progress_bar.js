$.ajax({
    xhr: function() {
      var xhr = new window.XMLHttpRequest();
  
      xhr.upload.addEventListener("progress", function(evt) {
        if (evt.lengthComputable) {
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          console.log(percentComplete);
  
          if (percentComplete === 100) {
  
          }
  
        }
      }, false);
  
      return xhr;
    },
    url: posturlfile,
    type: "POST",
    data: JSON.stringify(fileuploaddata),
    contentType: "application/json",
    dataType: "json",
    success: function(result) {
      console.log(result);
    }
  });