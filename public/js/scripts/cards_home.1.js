var x = screen.width;
                        var n;
                        if (x<813){
                            n=6;
                        }else{
                            n=3;
                        }
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
                                    <div class="front" style="border-radius: 10px;"><img id="ale" src="images/homepage/' + cover[i] + '">\
                                      <div class="text-block">\
                                        <h6 class="paeseCard">' + paese[i] + '</h6>\
                                      </div>\
                                    </div>\
                                    <div class="back" style="border-radius: 10px;"><img id="ale" src="images/homepage/' + back[i] + '" style="filter:brightness(25%);">\
                                      <div class="btn-block">\
                                        <a href="' + h_page[i] + '">\
                                          <button type="button" class="btn btn-pill btn-success al" href="' + h_page[i] + '"><img src="https://png.icons8.com/ios/22/ffffff/literature.png">&nbsp;&nbsp; Info</button>\
                                        </a>\
                                        <br>\
                                        <br>\
                                        <a href="' + pic_page[i] + '">\
                                          <button type="button" class="btn btn-pill btn-success al" href="'+ pic_page[i] + '"><img src="https://png.icons8.com/wired/22/ffffff/picture.png">&nbsp;&nbsp; Images</button>\
                                        </a>\
                                      </div>\
                                    </div>\
                                  </div>\
                                </div>';
                            document.write(dad);
                        }