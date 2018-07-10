//animation
var pressElements = document.querySelectorAll('.tocco, .btn:not(.al), .link-modal');

pressElements.forEach(element => {
  element.addEventListener('touchstart',function() {touched(this)});
  element.addEventListener('touchend',function() {moved(this)});
});


function touched(el){
  pressElements.forEach(function (element, index) {
    if(element === el){
      //console.log("pressElements number " + index + " activated the function");
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
  pressElements.forEach(function (element) {
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

//============================================================================================================//
//lingua
function lg(el){
	jazik(el.value);
}

function jazik (lingua){
    checkCookie(lingua);
}

function setCookie(cname,cvalue,exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

function checkCookie(a) {
    var x = getCookie("idioma");
    //console.log(x);
    if(!x){
        if(a == "mkd"){
            alert("Вашата страна е веќе на македонски.");
        }else{
            setCookie("idioma", a, 365);
           location.reload();
        }
    }
    if (x == a) {
        if(a == "eng"){
            alert("Your page is already in english.");
        }else{
            alert("Вашата страна е веќе на македонски.");
        }
    } else {
        setCookie("idioma", a, 365);
        location.reload();
    }
}