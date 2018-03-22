var footer = '\
<div class="container message">\
                <div class="text-center" style="padding-bottom: 70px;">\
                    <h3 class="text-white">Help us improve!</h3>\
                </div>\
                <div style="text-align: center; padding: auto; margin: auto;">\
                    <div class="row">\
                    <!--credits-->\
                    <a href="credits.html" class="btn btn-pill btn-primary mr-4" title="Attributions">\
                        <img src="https://png.icons8.com/ios/15/ffffff/road-worker-filled.png">&ensp;\
                        Attributions&ensp;\
                    </a>\
                    <!--feedback-->\
                    <a href="https://goo.gl/forms/vFWb1KEqR7bV8g4H3" class="btn btn-pill btn-primary mr-4" title="Your feedback is important for us!">\
                        <i class="fa fa-comment mr-1">&ensp;</i>\
                        Your Feedback&ensp;\
                    </a>\
                    <!--terms and conditions-->\
                    <a href="tac.html" class="btn btn-pill btn-primary mr-4" title="Terms and conditions">\
                        <img src="https://png.icons8.com/ios/15/ffffff/rules-filled.png">\
                        &ensp;&ensp;Terms and conditions&ensp;\
                    </a>\
                    <!--contacts-->\
                    <button type="button" class="btn btn-pill btn-primary mr-4" data-toggle="tooltip" data-placement="top" title="something@else.com"><img src="https://png.icons8.com/ios/15/ffffff/secured-letter-filled.png">&ensp;&ensp;Contacts&ensp;</button>\
                    <!--share on facebook-->\
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://80.211.7.75:3000" class="btn btn-pill btn-primary mr-4" title="Share on Facebook">\
                        <i class="fa fa-facebook mr-1"></i>\
                        Share on Facebook\
                    </a>\
                </div>\
            </div>\
        </div>';

var footer_small='\
            <div class="container message">\
                <div class="text-center" style="padding-bottom: 50px;">\
                    <h3 class="text-white">Help us improve!</h3>\
                </div>\
                <!--contacts-->\
                <div style="text-align: center; padding: auto; margin: auto; padding: 10px;">\
                    <button type="button" class="btn btn-pill btn-primary" data-toggle="tooltip" data-placement="top" title="something@else.com"><img src="https://png.icons8.com/ios/15/ffffff/secured-letter-filled.png">&ensp;&ensp;Contacts&ensp;</button>\
                </div>\
                <!--credits-->\
                <div style="text-align: center; padding: auto; margin: auto; padding: 10px;">\
                    <a href="credits.html" class="btn btn-pill btn-primary" title="Attributions">\
                        <img src="https://png.icons8.com/ios/15/ffffff/road-worker-filled.png">&ensp;\
                        Attributions&ensp;\
                    </a>\
                </div>\
                <!--feedback-->\
                <div style="text-align: center; padding: auto; margin: auto; padding: 10px;">\
                    <a href="https://goo.gl/forms/vFWb1KEqR7bV8g4H3" class="btn btn-pill btn-primary" title="Your feedback is important for us!">\
                        <i class="fa fa-comment mr-1">&ensp;</i>\
                        Your Feedback&ensp;\
                    </a>\
                </div>\
                <!--terms and conditions-->\
                <div style="margin: auto; padding-bottom: 10px; padding-top: 10px;">\
                    <a href="tac.html" class="btn btn-pill btn-primary" title="Terms and conditions">\
                        <img src="https://png.icons8.com/ios/15/ffffff/rules-filled.png">\
                        &ensp;&ensp;Terms and conditions&ensp;\
                    </a>\
                </div>\
                <!--share on facebook-->\
                <div style="text-align: center; padding: auto; margin: auto; padding: 10px;">\
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://80.211.7.75:3000" class="btn btn-pill btn-primary" title="Share on Facebook">\
                        <i class="fa fa-facebook mr-1"></i>\
                        Share on Facebook\
                    </a>\
                </div>\
            </div>';

var x = screen.width;
            if (x<813){
                document.write(footer_small);
            }else{
                document.write(footer);
            }