var x = screen.width;
              if (x<813){
                  var d = '<ul class="menu2">\
                            <a href="#geo" style="text-decoration:none;">\
                              <li class="submenu">Geographical characteristichs</li>\
                            </a>\
                            <a href="#pop" style="text-decoration:none;">\
                              <li class="submenu">Population</li>\
                            </a>\
                            <a href="#h" style="text-decoration:none;">\
                              <li class="submenu">Cultural-Historical features</li>\
                            </a>\
                            <a href="#his" style="text-decoration:none;">\
                              <li class="submenu">A bit of history</li>\
                            </a>\
                          </ul>';
              }else{
                  var d = '<ul class="menu">\
                            <a href="#geo" style="text-decoration:none;">\
                              <li class="submenu" style="border-right: 1px solid #666;">Geographical characteristichs</li>\
                            </a>\
                            <a href="#pop" style="text-decoration:none;">\
                              <li class="submenu" style="border-right: 1px solid #666;">Population</li>\
                            </a>\
                            <a href="#h" style="text-decoration:none;">\
                              <li class="submenu" style="border-right: 1px solid #666;">Cultural-Historical features</li>\
                            </a>\
                            </a>\
                            <a href="#his" style="text-decoration:none;">\
                              <li class="submenu">A bit of history</li>\
                            </a>\
                          </ul>';
              }
              document.write(d);