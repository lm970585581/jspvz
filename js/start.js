// 背景显示，并且向右有一个平移
var otg = document.getElementById("tGround");
otg.style.backgroundImage = "url(images/interface/background1unsodded.jpg)";
otg.style.visibility = "visible";
var x = 0;
var timer = setInterval(function () {
    x -= 20;
    otg.style.backgroundPosition = x + "px 0px";
    if (x <= -500) {
        clearInterval(timer);

        // 显示5个僵尸
        var dZombie = document.getElementById("dZombie");
        dZombie.style.left = (900 - 335) + "px";
        // 创建一个僵尸
        for (var n = 0; n < 5; n++) {
            var jx = document.createElement("div");
            jx.style.position = "absolute";
            jx.style.left = Math.random() * (dZombie.offsetWidth - 166) + "px";
            jx.style.top = Math.random() * (dZombie.offsetHeight - 144) + "px";
            jx.zIndex = 1;
            jx.innerHTML = '<img src="images/interface/plantshadow32.png" alt="数据丢失" style="position: absolute;left: 72px;top: 122px;"> ' +
                '<img src="images/Zombies/Zombie/1.gif" alt="数据丢失" style="position: absolute;left: 10px;top: 0;">'
            dZombie.appendChild(jx);
        }
        // 背景回到-115px 僵尸隐藏起来
        setTimeout(function () {
            dZombie.style.left = "1065px";
            otg.style.backgroundPosition = "-115px 0px";
            // 草坪平铺

            // 滚草坪
            var odal = document.getElementById("dAll");

            var sod = document.getElementById("sod");//草坪
            sod.style.position = "absolute";
            sod.style.height = "117px";
            sod.style.width = "70px";
            sod.style.top = "280px";
            sod.style.left = "132px";
            sod.style.zIndex = 1;
            sod.style.background = "url(images/interface/sod1row.png) no-repeat 0px 0px";

            // 卷轴
            var sodRoll = document.createElement("img");
            sodRoll.src = "images/interface/SodRoll.png";
            sodRoll.style.width="68px";
            sodRoll.style.height="141px";
            sodRoll.style.position = "absolute";
            sodRoll.style.top = "250px";
            sodRoll.style.left = "132px";
            sodRoll.style.zIndex = 1;
            odal.appendChild(sodRoll);

            // 卷轴盖
            var sodCap = document.createElement("img");
            sodCap.src = "images/interface/SodRollCap.png";
            sodCap.style.width="73px";
            sodCap.style.height="71px";
            sodCap.style.position = "absolute";
            sodCap.style.top = "345px";
            sodCap.style.left = "132px";
            sodCap.style.zIndex = 1;
            odal.appendChild(sodCap);

            var w = 20;
            var L = 1;
            var stimer = setInterval(function () {
                sod.style.width = sod.offsetWidth + w + "px";
                sodRoll.style.left = sodRoll.offsetLeft + w+L+"px";
                sodCap.style.left = sodCap.offsetLeft + w +L+ "px";

                sodRoll.style.width = sodRoll.offsetWidth - L + "px";
                sodCap.style.width = sodCap.offsetWidth - L + "px";
                sodCap.style.height = sodCap.offsetHeight - L + "px";
                sodCap.style.top = sodCap.offsetTop + L  + "px";

                if(sod.offsetWidth>=755){
                    clearInterval(stimer);
                    odal.removeChild(sodRoll);
                    odal.removeChild(sodCap);
                }
            }, 30)
        }, 2000)
    }
}, 30);


// 草坪平铺