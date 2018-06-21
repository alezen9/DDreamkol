var navbar2 = '\
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
document.write(navbar2);

var h = document.querySelector('.navbar').offsetHeight;
console.log(h);
 var body = document.querySelector('body');
 body.style.paddingTop = h + "px";