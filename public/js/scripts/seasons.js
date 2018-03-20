var divNight = '<div class="welcome d-flex justify-content-center flex-column night-sky">';
    var divDay = '<div class="welcome d-flex justify-content-center flex-column day-sky">';
    var divAutumn = '<div class="welcome d-flex justify-content-center flex-column autumn">';
    var divSpring = '<div class="welcome d-flex justify-content-center flex-column spring">';
    var snow = '<div class="snow"></div>';
    var sun = '<div id="sun" style="transform-origin: 100% -145%; transform: scale(0.5,0.5);">\
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
        document.write(leaves);
    }else if(month<6 && month>3){
        document.write(divSpring)
        document.write(flower);
    }else{
        document.write(divDay)
        document.write(sun);
    }