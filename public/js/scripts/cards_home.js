var x = screen.width;
var t = document.querySelector('#main').innerHTML;
var paese;
if(t == "DDreamKol"){
  paese = ['Bezevo','Boroec','Drenok','Dolno Lukovo','Gorno Lukovo','Jablanica','Lakaica','Modrich','Nerezi','Piskupshtina'];
}else{
  paese = ['Безево','Бороец','Дренок','Долно Луково','Горно Луково','Јабланица','Лакаица','Модрич','Нерези','Пискупштина'];
}
var n;
var folder;
if (x<813){
    n=6;
    folder = "big/";
}else{
    n=3;
    folder = "big/";
}
var cover = ['cover.png','boroec.jpg','drenok.jpg','dlukovo.jpg','glukovo.jpg','jablanica.jpg','cover.png','modric.jpg','nerezi.jpeg','piskupshtina.jpg'];
var pic_page =  ['/bezevo_pic','/borovec_pic','/drenok_pic','/d_lukovo_pic','/g_lukovo_pic','/jablanica_pic','/lakavica_pic','/modrich_pic','/nerezi_pic','/piskupshtina_pic'];
var h_page =  ['/bezevo_h','/borovec_h','/drenok_h','/d_lukovo_h','/g_lukovo_h','/jablanica_h','/lakavica_h','/modrich_h','/nerezi_h','/piskupshtina_h'];
var back = ['cover.jpg','boroec.jpg','drenok.jpg','dlukovo.jpg','glukovo.jpg','jablanica.jpg','cover.jpg','modric.jpg','nerezi.jpeg','piskupshtina.jpg'];
var i;
for(i = 0;i<10;i++){
  var carta = '\
    <div class="flip-container">\
      <div class="flipper">\
        <div class="front" style="border-radius: 10px;"><img class="slikaselo" src="images/homepage/big/' + cover[i] + '">\
          <div class="text-block">\
            <h6 class="paeseCard">' + paese[i] + '</h6>\
          </div>\
        </div>\
        <div class="back" style="border-radius: 10px;"><img class="slikaselo" src="images/homepage/small/' + back[i] + '">\
          <div class="btn-block">\
            <a class="ancoraggio1" href="' + h_page[i] + '">\
              <button type="button" class="btn btn-outline-success al binfo" href="' + h_page[i] + '"><i class="fas fa-info-circle big-icon"></i></button>\
            </a>\
            <a class="ancoraggio2" href="' + pic_page[i] + '">\
              <button type="button" class="btn btn-outline-primary al bimg" href="'+ pic_page[i] + '"><i class="far fa-images big-icon"></i></button>\
            </a>\
          </div>\
        </div>\
      </div>\
    </div>';
  document.write(carta);
}