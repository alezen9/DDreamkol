var navbar = '\
	<div>\
		<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgba(0,0,0,0.8);">\
		    <a href="/"><img src="images/demo/shards-logo.svg" alt="Example Navbar 1" class="mr-2" height="30px"></a>\
	        <a class="navbar-brand" style="margin-right: inherit; margin-left: 1rem;" href="/">Д.ДРИМКОЛ</a>\
	        <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-2" aria-controls="navbarNavDropdown-2" aria-expanded="false" aria-label="Toggle navigation" style="border: none;">\
				<span></span>\
				<span></span>\
				<span></span>\
	        </button>\
	        <div class="collapse navbar-collapse mr-auto" id="navbarNavDropdown-2" style="text-align: center;">\
	            <ul class="navbar-nav mr-auto">\
					<li class="nav-item">\
	                    <a class="nav-link" href="/news">Новости\
	                        <span class="sr-only">(current)</span>\
	                    </a>\
					</li>\
					<li class="nav-item dropdown">\
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"\
                           data-toggle="dropdown" aria-haspopup="true"\
						   aria-expanded="false">\
						   <span class="dricon"></span>\
                            Турнири\
                        </a>\
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none;">\
                            <a class="dropdown-item" href="/ddis" style="color: white; background-color: transparent;">Д-дримколски Илинденски Средби</a>\
                            <a class="dropdown-item" href="page_in_development.html" style="color: white; background-color: transparent;">Првомајски Турнир Пискупштина</a>\
                        </div>\
                    </li>\
	                <li class="nav-item">\
	                    <a class="nav-link" href="page_in_development.html">За Долни Дримкол\
	                        <span class="sr-only">(current)</span>\
	                    </a>\
					</li>\
					<li class="nav-item">\
	                    <a class="nav-link" href="/peopleSay">Луѓето велат...\
	                        <span class="sr-only">(current)</span>\
	                    </a>\
					</li>\
				</ul>\
				<div id="blang">\
					<button class="lang" value="mkd" onclick="lg(this);"></button>\
					<button class="lang" value="eng" onclick="lg(this);"></button>\
				</div>\
				<div>\
	            <a href="/upload">\
	        	    <button style="width: 230px;" type="button" class="btn btn-pill btn-outline-success" href="/upload"><i class="fa fa-upload mr-1"></i> Прикачи</button>\
	            </a>\
	            </div>\
	        </div>\
	    </nav>\
	</div>\
';
document.write(navbar);

function lg(el){
	jazik(el.value);
}

function jazik (lingua){
	var current_lang = lingua;
	var info = {"lang": current_lang};
	//var url = 'http://192.168.0.8:3000/api/current' + JSON.stringify(info);
	var url = 'http://localhost:3000/api/current/' + JSON.stringify(info);
	fetch(url)
		.then(res => res.json())
		.then(data => {
			//console.log(data.uguale);
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
}