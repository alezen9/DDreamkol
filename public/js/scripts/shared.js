// google analythics
var head = document.querySelector('head');
var script1 = document.createElement('script');
script1.setAttribute('src','https://www.googletagmanager.com/gtag/js?id=UA-129401556-1');
script1_att = document.createAttribute('async');
script1.setAttributeNode(script1_att);
head.appendChild(script1);
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'UA-129401556-1');

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


//============================================================================================================//
//scroll to top

var btnTop = document.createElement("button");
btnTop.setAttribute('id','toTop');
//var t = document.createTextNode("▲");
//btnTop.appendChild(t);
document.body.appendChild(btnTop);
/*
toTop.addEventListener('click', () => window.scrollTo({
  top: 0,
  behavior: 'smooth',
}));*/
const TIMINGFUNC_MAP = {
    "linear": t => t,
    "ease-in": t => t * t,
    "ease-out": t => t * ( 2 - t ),
    "ease-in-out": t => ( t < .5 ? 2 * t * t : -1 + ( 4 - 2 * t ) * t )
  };

/**
* Scroll from initY to 0
* @param {number} initY - initial scroll Y
* @param {number} duration - transition duration
* @param {string} timingName - timing function name. Can be one of linear, ease-in, ease-out, ease-in-out
*/
function scrollTopSmooth( initY, duration = 300, timingName = "linear" ) {  
const timingFunc = TIMINGFUNC_MAP[ timingName ];
let start = null;
const step = ( timestamp ) => {
start = start || timestamp;
const progress = timestamp - start,
      // Growing from 0 to 1
      time = Math.min( 1, ( ( timestamp - start ) / duration ) );

window.scrollTo( 0, initY - ( timingFunc( time ) * initY ) );
if ( progress < duration ) {
  window.requestAnimationFrame( step );
}
};

window.requestAnimationFrame( step );  
}

// Subscribe any element with [href="#"]
var btnTop = document.querySelector( "#toTop");
 btnTop.addEventListener( "click", ( e ) => {
   e.preventDefault();
   scrollTopSmooth( window.scrollY, 300, "ease-in-out" ); 
 });
 var toTop = document.querySelector('#toTop');
window.onscroll = function() {hideToTop()};
function hideToTop(){
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    if (scrollTop > window.innerHeight && window.innerWidth <= 813){
        toTop.style.display = 'block';
    }else{
        toTop.style.display = 'none';
    }
}