// 点击选项卡，创建植物，变灰
var dcars=document.getElementById("dCardoPeashooter");
var dAll=document.getElementById("dAll");
var sod=document.getElementById("sod");
var a,b;

dcars.onclick=function () {
    // 创建植物
    var car=document.createElement("img");
    car.src="images/Peashooter.gif";
    car.style.cssText="position:absolute;z-index:999;left:0;top:0;";
    dAll.appendChild(car);
    // 创建透明的
    var car_opa=document.createElement("img");
    car_opa.src="images/Peashooter.gif";
    car_opa.style.cssText="position:absolute;z-index:900;left:0;top:0;opacity:0.8;filter:alpha(opacity=80);display:none;";
    dAll.appendChild(car_opa);

    // 变灰
    var imgs=dcars.getElementsByTagName("img");
    imgs[1].style.visibility="hidden";

    function green() {
        dAll.removeChild(car);
        dAll.removeChild(car_opa);
        imgs[1].style.visibility="visible";
    }

    document.onmousemove=function (e) {
        var e=e||window.event;
        car.style.left=e.clientX-car.offsetWidth/2+"px";
        car.style.top=e.clientY-car.offsetHeight/2+"px";

        if (e.clientY<sod.offsetTop||e.clientY>sod.offsetTop+sod.offsetHeight){//不在草地
            car.onclick=green;
            car.oncontextmenu=green;
        }else{
            car.oncontextmenu=null;
            car_opa.style.display="block";
            car_opa.style.top=sod.offsetTop+sod.offsetHeight/2-car_opa.offsetHeight/2-20+"px";

            var onewidth=sod.offsetWidth/9;
            if(e.clientX<sod.offsetLeft+onewidth){
                car_opa.style.left=sod.offsetLeft+onewidth/2-car_opa.offsetWidth/2+"px";
            }else if(e.clientX>sod.offsetLeft+8*onewidth){
                car_opa.style.left=sod.offsetLeft+8.5*onewidth-car_opa.offsetWidth/2+"px";
            }else{
                for(var n=1;n<8;n++){
                    if(e.clientX>sod.offsetLeft+n*onewidth&&e.clientX<sod.offsetLeft+(n+1)*onewidth){
                        car_opa.style.left=sod.offsetLeft+(n+0.5)*onewidth-car_opa.offsetWidth/2+"px";
                    }
                }
            }

            car.onclick=function () {
                var sSunNum=document.getElementById("sSunNum");
                var num=parseInt(sSunNum.innerHTML);
                if(num>=100){
                    a=car.style.left=car_opa.offsetLeft+"px";
                    b=car.style.top=car_opa.offsetTop+"px";
                    document.onmousemove=null;
                    dAll.removeChild(car);
                    dAll.removeChild(car_opa);
                    imgs[1].style.visibility="visible";
                    num-=100;
                    sSunNum.innerHTML=num;
                    car.onclick=null;
                    var zw=new Plant();
                    zw.doplant();
                    zw.shoot();
                    plant.push(zw);
                }
            }
        }
    }
}
