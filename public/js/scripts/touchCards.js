var foto = document.querySelectorAll('.tocco');

function touched(el){
  foto.forEach(function (element, index) {
    if(element === el){
      //console.log("foto number " + index + " activated the function");
      element.classList.add("touched");
    }
  });
}

function moved (el){
  foto.forEach(function (element) {
    if(element === el){
      element.classList.remove("touched");
    }
  });
}

foto.forEach(element => {
  element.addEventListener('touchstart',function() {touched(this)});
  element.addEventListener('touchend',function() {moved(this)});
});