var footer = '\
<div class="container message">\
                <div class="text-center" style="padding-bottom: 70px;">\
                    <h3 class="text-white">Help us improve!</h3>\
                </div>\
                <div style="text-align: center; margin: auto;">\
                    <div class="row">\
                    <!--credits-->\
                    <div style="margin: 10px auto; padding: auto;">\
                        <a href="/about_us" class="btn btn-pill btn-primary" title="Attributions">\
                            <i class="fas fa-info-circle"></i>\
                            &ensp;About us&ensp;\
                        </a>\
                    </div>\
                    <!--feedback-->\
                    <div style="margin: 10px auto; padding: auto;">\
                        <a href="https://goo.gl/forms/vFWb1KEqR7bV8g4H3" class="btn btn-pill btn-primary" title="Your feedback is important for us!">\
                            <i class="fa fa-comment mr-1">&ensp;</i>\
                            Your Feedback&ensp;\
                        </a>\
                    </div>\
                    <!--terms and conditions-->\
                    <div style="margin: 10px auto; padding: auto;">\
                        <a href="tac.html" class="btn btn-pill btn-primary" title="Terms and conditions">\
                            <i class="fas fa-user-shield"></i>\
                            &nbsp;&nbsp;Terms and conditions\
                        </a>\
                    </div>\
                    <!--contacts-->\
                    <div style="margin: 10px auto; padding: auto;">\
                        <button type="button" class="btn btn-pill btn-primary" data-toggle="tooltip" data-placement="top" title="ddreamkol@gmail.com">\
                        <i class="fas fa-envelope"></i>\
                        &nbsp;Contacts&nbsp;</button>\
                    </div>\
                    <!--share on facebook-->\
                    <div style="margin: 10px auto; padding: auto;">\
                        <a href="https://www.facebook.com/sharer/sharer.php?u=http://80.211.7.75:3000" class="btn btn-pill btn-primary" title="Share on Facebook">\
                            <i class="fab fa-facebook-square"></i>\
                            &nbsp;&nbsp;Share on Facebook\
                        </a>\
                    </div>\
                </div>\
            </div>\
        </div>';

var footer_small='\
            <div class="container message">\
                <div class="text-center" style="padding-bottom: 50px;">\
                    <h3 class="text-white">Help us improve!</h3>\
                </div>\
                <!--contacts-->\
                <div style="text-align: center; margin: auto; padding-top: 10px; padding-bottom: 10px;">\
                    <button type="button" class="btn btn-pill btn-primary" data-toggle="tooltip" data-placement="top" title="ddreamkol@gmail.com">\
                    <i class="fas fa-envelope"></i>\
                    &nbsp;Contacts&nbsp;</button>\
                </div>\
                <!--credits-->\
                <div style="text-align: center; margin: auto; padding-top: 10px; padding-bottom: 10px;">\
                    <a href="/about_us" class="btn btn-pill btn-primary" title="Attributions">\
                        <i class="fas fa-info-circle"></i>\
                        &ensp;About us&ensp;\
                    </a>\
                </div>\
                <!--feedback-->\
                <div style="text-align: center;margin: auto; padding-top: 10px; padding-bottom: 10px;">\
                    <a href="https://goo.gl/forms/vFWb1KEqR7bV8g4H3" class="btn btn-pill btn-primary" title="Your feedback is important for us!">\
                        <i class="fa fa-comment mr-1">&ensp;</i>\
                        Your Feedback&ensp;\
                    </a>\
                </div>\
                <!--terms and conditions-->\
                <div style="text-align: center;margin: auto; padding-top: 10px; padding-bottom: 10px;">\
                    <a href="tac.html" class="btn btn-pill btn-primary" title="Terms and conditions">\
                        <i class="fas fa-user-shield"></i>\
                        &nbsp;&nbsp;Terms and conditions\
                    </a>\
                </div>\
                <!--share on facebook-->\
                <div style="text-align: center; margin: auto; padding-top: 10px; padding-bottom: 10px;">\
                    <a href="https://www.facebook.com/sharer/sharer.php?u=http://80.211.7.75:3000" class="btn btn-pill btn-primary" title="Share on Facebook">\
                        <i class="fab fa-facebook-square"></i>\
                        &nbsp;&nbsp;Share on Facebook\
                    </a>\
                </div>\
            </div>';

var x = screen.width;
            if (x<813){
                document.write(footer_small);
            }else{
                document.write(footer);
            }