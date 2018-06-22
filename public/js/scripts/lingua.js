function lg(el){
	jazik(el.value);
}

function jazik (lingua){
    checkCookie(lingua);
}


/*
function jazik (lingua){
	var current_lang = checkCookie(lingua);
	console.log(current_lang);
	//var info = {"lang": current_lang};
	//var url = 'http://80.211.7.75:3000/api/current/' + JSON.stringify(info);
	//var url = 'http://localhost:3000/api/current/' + JSON.stringify(info);
	/*fetch(url)
		.then(res => res.json())
		.then(data => {
			console.log(data.uguale);
			if(data.uguale == "no"){
				location.reload();	
			}else{
				if(lingua == "eng"){
					alert("You page is already in english.");	
				}else{
					alert("Вашата страна е веќе на македонски.");	
				}
			}
		})
		.catch(error => console.error('Error:', error));
}*/

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