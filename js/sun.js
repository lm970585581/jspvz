setInterval(fn,5000);
var autoPick=true;
function fn() {
    // 随机产生阳光
    var sun=document.createElement("img");
    var odall=document.getElementById("dAll");
    sun.src="images/interface/Sun.gif";
    sun.style.position="absolute";
    sun.style.cursor="pointer";
    sun.style.zIndex=25;
    sun.style.opacity=0.8;
    sun.style.filter="alpha(opacity=80)";
    sun.style.height="78px";
    sun.style.width="78px";
    sun.style.left=Math.random()*(odall.offsetWidth-sun.offsetWidth)+"px";
    var n=1;
    var H=Math.random()*(odall.offsetHeight-sun.offsetHeight);
    var timer=setInterval(function () {
        sun.style.top=sun.offsetTop+n+"px";
        if(sun.offsetTop>=H){
            clearInterval(timer);
            timer=null;

            if (autoPick){
                setTimeout(function () {
                    sun.onclick();
                },3000)
            }else {
                odall.removeChild(sun);
            }
        }
    },30)
    odall.appendChild(sun);


// 点击阳光
    sun.onclick=function () {
        // 停止掉落
        if(timer!=null){
            clearInterval(timer);
        }

        // 点击后飞行轨道
        var a=sun.offsetLeft-80+sun.offsetWidth/2;
        var b=sun.offsetTop-20+sun.offsetHeight/2;
        var c=Math.sqrt(a*a+b*b);

        var speedX=a/c;
        var speedY=b/c;
        var speed=20;

        var ftimer=setInterval(function () {
            sun.style.left=sun.offsetLeft-speed*speedX+"px";
            sun.style.top=sun.offsetTop-speed*speedY+"px";
            if(sun.offsetLeft<=80||sun.offsetTop<=-20){
                clearInterval(ftimer);
                ftimer=null;
                sun.style.left="80px";
                sun.style.top="-20px";
            }
        },30)
        // 阳光0.5秒后消失，积分盘分数累积

        setTimeout(function () {
            odall.removeChild(sun);
            var sSunNum=document.getElementById("sSunNum");
            var num=parseInt(sSunNum.innerHTML);
            num+=25;
            sSunNum.innerHTML=num;
        },500)
    }
}

