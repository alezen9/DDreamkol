var navbar = '\
	<div>\
		<nav class="navbar navbar-expand-lg navbar-dark" style="background-color: rgba(0,0,0,0.8);">\
		    <a href="homepage.html"><img src="images/demo/shards-logo.svg" alt="Example Navbar 1" class="mr-2" height="30px"></a>\
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
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink" style="background-color: rgba(0,0,0,0.8); border: none; box-shadow: none;">\
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
	            <div>\
	            <a href="/upload">\
	        	    <button style="width: 230px;" type="button" class="btn btn-pill btn-outline-success" href="/upload"><i class="fa fa-upload mr-1"></i> Contribute</button>\
	            </a>\
	            </div>\
	        </div>\
	    </nav>\
	</div>\
';
document.write(navbar);