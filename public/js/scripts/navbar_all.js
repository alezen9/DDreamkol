var pathArray = window.location.pathname.split( '/' );

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


var navbar2_eng = '\
			<div>\
				<nav class="navbar fixed-top navbar-expand-lg navbar-dark">\
					<a href="/"><img src="images/demo/shards-logo.svg" alt="Example Navbar 1" class="mr-2" height="30px"></a>\
					<a class="navbar-brand" style="margin-right: inherit; margin-left: 1rem;" href="/">DDreamKol</a>\
					<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-2" aria-controls="navbarNavDropdown-2" aria-expanded="false" aria-label="Toggle navigation" style="border: none;">\
						<span></span>\
						<span></span>\
						<span></span>\
					</button>\
					<div class="collapse navbar-collapse mr-auto" id="navbarNavDropdown-2" style="text-align: center;">\
						<ul class="navbar-nav mr-auto">\
							<li class="nav-item">\
								<a class="nav-link" href="/news">News\
									<span class="sr-only">(current)</span>\
								</a>\
							</li>\
							<li class="nav-item dropdown">\
								<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"\
								data-toggle="dropdown" aria-haspopup="true"\
								aria-expanded="false">\
									Tournaments\
								</a>\
								<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none; text-align: center;">\
									<a class="dropdown-item" href="/ddis" style="color: white; background-color: transparent;">Dolnodrimkolski Ilindenski Sredbi</a>\
									<a class="dropdown-item" href="page_in_development.html" style="color: white; background-color: transparent;">Prvomajski Turnir Piskupshtina</a>\
								</div>\
							</li>\
							<li class="nav-item">\
								<a class="nav-link" href="page_in_development.html">About Dolni Drimkol\
									<span class="sr-only">(current)</span>\
								</a>\
							</li>\
							<li class="nav-item">\
								<a class="nav-link" href="/peopleSay">People say...\
									<span class="sr-only">(current)</span>\
								</a>\
							</li>\
						</ul>\
						<div id="blang">\
							<button class="lang" value="mkd" onclick="lg(this);"></button>\
							<button class="lang" value="eng" onclick="lg(this);"></button>\
						</div>\
					</div>\
				</nav>\
			</div>\
		';

		var navbar_mkd = '\
		<div>\
			<nav class="navbar fixed-top navbar-expand-lg navbar-dark">\
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
							<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none; text-align: center;">\
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

	var navbar_eng = '\
	<div>\
		<nav class="navbar fixed-top navbar-expand-lg navbar-dark">\
			<a href="/"><img src="images/demo/shards-logo.svg" alt="Example Navbar 1" class="mr-2" height="30px"></a>\
			<a class="navbar-brand" style="margin-right: inherit; margin-left: 1rem;" href="/">DDreamKol</a>\
			<button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarNavDropdown-2" aria-controls="navbarNavDropdown-2" aria-expanded="false" aria-label="Toggle navigation" style="border: none;">\
				<span></span>\
				<span></span>\
				<span></span>\
			</button>\
			<div class="collapse navbar-collapse mr-auto" id="navbarNavDropdown-2" style="text-align: center;">\
				<ul class="navbar-nav mr-auto">\
					<li class="nav-item">\
						<a class="nav-link" href="/news">News\
							<span class="sr-only">(current)</span>\
						</a>\
					</li>\
					<li class="nav-item dropdown">\
						<a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink"\
						data-toggle="dropdown" aria-haspopup="true"\
						aria-expanded="false">\
						<span class="dricon"></span>\
							Tournaments\
						</a>\
						<div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none; text-align: center;">\
							<a class="dropdown-item" href="/ddis" style="color: white; background-color: transparent;">Dolnodrimkolski Ilindenski Sredbi</a>\
							<a class="dropdown-item" href="page_in_development.html" style="color: white; background-color: transparent;">Prvomajski Turnir Piskupshtina</a>\
						</div>\
					</li>\
					<li class="nav-item">\
						<a class="nav-link" href="page_in_development.html">About Dolni Drimkol\
							<span class="sr-only">(current)</span>\
						</a>\
					</li>\
					<li class="nav-item">\
						<a class="nav-link" href="/peopleSay">People say...\
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
					<button style="width: 230px;" type="button" class="btn btn-pill btn-outline-success" href="/upload"><i class="fa fa-upload mr-1"></i> Upload</button>\
				</a>\
				</div>\
				<div class="fullScreen"></div>\
			</div>\
		</nav>\
	</div>\
';	

var navbar2_mkd = '\
	<div>\
		<nav class="navbar fixed-top navbar-expand-lg navbar-dark">\
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
                           Турнири\
                        </a>\
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none; text-align: center;">\
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
	        </div>\
	    </nav>\
	</div>\
';

var x = getCookie("idioma");
if (!x || x=="mkd"){
	if(pathArray[1] == "upload"){
		document.write(navbar2_mkd);
	}else{
		document.write(navbar_mkd);
	}
}else{
	if(pathArray[1] == "upload"){
		document.write(navbar2_eng);
	}else{
		document.write(navbar_eng);
	}
}

var h = document.querySelector('.navbar').offsetHeight;
 var body = document.querySelector('body');
 body.style.paddingTop = h + "px";