/*
aggingere questi nella homepage prima
<link rel="stylesheet" href="css/sun.css">
<link rel="stylesheet" href="css/snow.css">
<link rel="stylesheet" href="css/leaves.css">
<link rel="stylesheet" href="css/flower.css">
*/



var date = new Date();
//var month = date.getMonth();
var month = 4;
//0=january-11=december
    
    var divNight = '<div class="welcome d-flex justify-content-center flex-column night-sky">';
    var divDay = '<div class="welcome d-flex justify-content-center flex-column day-sky">';
    var divAutumn = '<div class="welcome d-flex justify-content-center flex-column autumn">';
    var divSpring = '<div class="welcome d-flex justify-content-center flex-column spring">';
    var snow = '<div class="snow"></div>';
    var sun = '<div id="sun">\
                    <div id="rings">\
                        <div></div>\
                        <div></div>\
                        <div></div>\
                        <div></div>\
                    </div>\
                </div>';
    var leaves = '<div class="fallingLeaves">\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                    <span></span>\
                </div>';
    var leaves_small = '<div class="fallingLeaves">\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
                <span></span>\
            </div>';
    var flower = '<div class="petal-wrapper fl1">\
                    <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                    </div>\
                    <div class="core fl1"></div>\
                    <div class="petal-wrapper fl2">\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                        <div class="petal"></div>\
                    </div>\
                    <div class="core fl2"></div>';
    if(month<4 || month>11){
        document.write(divNight)
        document.write(snow);
    }else if(month<12 && month>9){
        document.write(divAutumn)
        if(screen.width>813){
            document.write(leaves);
        }
        else{
            document.write(leaves_small);
        }
    }else if(month<6 && month>3){
        document.write(divSpring)
        //document.write(flower);
    }else{
        document.write(divDay)
        document.write(sun);
    }