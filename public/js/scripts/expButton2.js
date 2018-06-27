function aggiungi(el){
    el.classList.add('clicked');
}
function togli(el){
    buttons.forEach(element => {
        if(element.children[2] == el){
            element.classList.remove('clicked');
        }
    });
}

var buttons = document.querySelectorAll('.share-btn');
buttons.forEach(element => {
    element.addEventListener('click',function(){
        aggiungi(this);
    });
});

var closes = document.querySelectorAll('.close');
closes.forEach(elem => {
    elem.addEventListener('click',function(e){
        togli(this);
        e.stopPropagation();
    });
});