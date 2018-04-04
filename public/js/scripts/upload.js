$(function(){
    
    var twoToneButton = document.querySelector('.twoToneButton');
    
    twoToneButton.addEventListener("click", function() {
        twoToneButton.innerHTML = "Uploading";
        twoToneButton.classList.add('spinning');
    }, false);
    
});