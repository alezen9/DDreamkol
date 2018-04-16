
var x = 0,
    container = $('.center'),
    items = container.find('li'),
    containerHeight = 0,
    numberVisible = 1,
    intervalSec = 4000;

if(!container.find('li:first').hasClass("first")){
  container.find('li:first').addClass("first");
}

items.each(function(){
  if(x < numberVisible){
    containerHeight = containerHeight + $(this).outerHeight();
    x++;
  }
});

container.css({ height: containerHeight, overflow: "hidden" });
  
function vertCycle() {
  var firstItem = container.find('li.first').html();
    
  container.append('<li class="news">'+firstItem+'</li>');
  firstItem = '';
  container.find('li.first').animate({ marginTop: "-50px" }, 400, function(){  $(this).remove(); container.find('li:first').addClass("first"); });
}

if(intervalSec < 700){
  intervalSec = 700;
}

var init = setInterval("vertCycle()",intervalSec);

container.hover(function(){
  clearInterval(init);
}, function(){
  init = setInterval("vertCycle()",intervalSec);
});