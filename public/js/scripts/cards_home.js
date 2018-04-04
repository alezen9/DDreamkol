var x = screen.width;
                        var w;
                        var h;
                        var n;
                        var a;
                        var b = " ";
                        var c = " ";
                        if (x<813){
                            w=150;
                            h=200;
                            n=6;
                            a = "transform: scale(0.6,0.6); bottom: 35px; right: 13px;";
                            b = "text-block2";
                            c = "text-align: right; padding-right: 5px; padding-bottom: 15px";
                        }else{
                            w=321;
                            h=449;
                            n=3;
                            a = "bottom: 170px;";
                            b = "text-block";
                        }
                        var classe = ['bezevo','boroec','drenok','dlukovo','glukovo','jablanica','lakavica','modric','nerezi','piskupshtina'];
                        var paese = ['Bezevo','Boroec','Drenok','Dolno Lukovo','Gorno Lukovo','Jablanica','Lakavica','Modric','Nerezi','Piskupshtina'];
                        var cover = ['cover.jpg','cover.jpg','drenok.jpg','dlukovo.jpg','glukovo.jpg','jablanica.jpg','lakavica.jpg','modric.jpg','nerezi.jpeg','piskupshtina.jpg'];
                        var pic_page =  ['/bezevo_pic','/borovec_pic','/drenok_pic','/d_lukovo_pic','/g_lukovo_pic','/jablanica_pic','/lakavica_pic','/modric_pic','/nerezi_pic','/piskupshtina_pic'];
                        var h_page =  ['info_bezevo.html','info_borovec.html','info_drenok.html','info_d_lukovo.html','info_g_lukovo.html','info_jablanica.html','info_lakavica.html','info_modric.html','info_nerezi.html','info_piskupshtina.html'];
                        var back = ['cover.jpg','cover.jpg','drenok.jpg','dlukovo.jpg','glukovo.jpg','jablanica.jpg','lakavica.jpg','modric.jpg','nerezi.jpeg','piskupshtina.jpg'];
                        var i;
                        for(i = 0;i<10;i++){
                            var dad = '\
                              <div class="flip-container">\
                                  <div class="flipper">\
                                  <!--<img class="senka2" src="images/other/shadows_low.png" width ="'+ (w+80) +'" height="'+ (h-50) +'">-->\
                                    <div class="front" style="border-radius: 10px;"><img id="ale" src="images/homepage/' + cover[i] + '" width="' + w + '" height="' + h + '">\
                                      <div class="' + b + '">\
                                        <h' + n + ' style="color: white; filter:drop-shadow(8px 8px 10px black);">' + paese[i] + '</h' + n + '>\
                                      </div>\
                                    </div>\
                                    <div class="back" style="border-radius: 10px;"><img id="ale" src="images/homepage/' + /*back[Math.floor(Math.random()*5)]*/ back[i] + '" width="' + w + '" height="' + h + '" style="filter:brightness(25%);">\
                                      <div class="btn-block"  style="' + a + '">\
                                        <a href="' + h_page[i] + '">\
                                          <button type="button" class="btn btn-pill btn-primary al" href="' + h_page[i] + '"><img src="https://png.icons8.com/ios/25/ffffff/literature.png">&nbsp;&nbsp; Info</button>\
                                        </a>\
                                        <br>\
                                        <br>\
                                        <a href="' + pic_page[i] + '">\
                                          <button type="button" class="btn btn-pill btn-primary al" href="'+ pic_page[i] + '"><img src="https://png.icons8.com/wired/25/ffffff/picture.png">&nbsp;&nbsp; Images</button>\
                                        </a>\
                                      </div>\
                                    </div>\
                                  </div>\
                                </div>';
                            document.write(dad);
                        }