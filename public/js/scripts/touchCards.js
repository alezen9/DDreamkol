var foto = document.querySelectorAll('.tocco');

foto.forEach(element => {
  element.addEventListener('touchstart',function() {touched(this)});
  element.addEventListener('touchend',function() {moved(this)});
});


function touched(el){
  foto.forEach(function (element, index) {
    if(element === el){
      //console.log("foto number " + index + " activated the function");
      /*
      if (element.classList.contains('al')){
        var figlio = element.children[0];
        figlio.classList.add("touched");
      }else{
        element.classList.add("touched");
      }*/
      element.classList.add("touched");
    }
  });
}

function moved (el){
  foto.forEach(function (element) {
    if(element === el){
      /*
      if (element.classList.contains('al')){
        var figlio = element.children[0];
        figlio.classList.remove("touched");
      }else{
        element.classList.remove("touched");
      }*/
      element.classList.remove("touched");
    }
  });
}