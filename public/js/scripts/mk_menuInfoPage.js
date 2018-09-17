var x = screen.width;
if (x<813){
    var d = '<ul class="menu2">\
              <a href="#geo" style="text-decoration:none;">\
                <li class="submenu">Географски карактеристики</li>\
              </a>\
              <a href="#pop" style="text-decoration:none;">\
                <li class="submenu">Демографија</li>\
              </a>\
              <a href="#h" style="text-decoration:none;">\
                <li class="submenu">Културно-Историски Одлики</li>\
              </a>\
              <a href="#his" style="text-decoration:none;">\
                <li class="submenu">Малку Историја</li>\
              </a>\
            </ul>';
}else{
    var d = '<ul class="menu">\
              <a href="#geo" style="text-decoration:none;">\
                <li class="submenu" style="border-right: 1px solid #666;">Географски карактеристики</li>\
              </a>\
              <a href="#pop" style="text-decoration:none;">\
                <li class="submenu" style="border-right: 1px solid #666;">Демографија</li>\
              </a>\
              <a href="#h" style="text-decoration:none;">\
                <li class="submenu" style="border-right: 1px solid #666;">Културно-Историски Одлики</li>\
              </a>\
              </a>\
              <a href="#his" style="text-decoration:none;">\
                <li class="submenu">Малку Историја</li>\
              </a>\
            </ul>';
}
document.write(d);