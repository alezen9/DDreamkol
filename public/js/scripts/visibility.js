/*var isInViewport = function (elem) {
    var bounding = elem.getBoundingClientRect();
    return (
        bounding.top >= 0 &&
        bounding.left >= 0 &&
        bounding.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
};*/

function isInViewport (elems) {
    elems.forEach(function (element, index) {
        var bounding = element.getBoundingClientRect();
        if(

            bounding.left >= 0 &&
            bounding.top <= (window.innerHeight || document.documentElement.clientHeight) &&
            bounding.right <= (window.innerWidth || document.documentElement.clientWidth)
        ){
            //console.log(index + " visible");
            element.classList.add("slideM");
        }else{
            //console.log(index + " no");
            element.classList.remove("slideM");
        } 
    });
};


/*
var h5 = document.querySelector('h5');
var x = document.getElementById('x');
if (isInViewport(x)) {
    console.log("it isssss!");
}else{
    console.log("its not!");
}*/