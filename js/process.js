var dPlants = document.getElementById("dPlants");
var dZombie = document.getElementById("dZombies");
var plant = [];
var zombie = [];
var state = 0;


// 创建植物对象
function Plant() {
    this.zw = this.init();
    this.blood = 4;
}
// 初始化植物
Plant.prototype.init = function () {
    var zw = document.createElement("div");
    zw.innerHTML = ' <img src="images/interface/plantshadow32.png" alt="" ' +
        'style="left: -12px;top: 49px;"> <img src="images/plant/Peashooter.gif" alt="">'
    return zw;
}
// 射击动作
Plant.prototype.shoot = function () {
    var This = this;
    this.timer = setInterval(function () {
        for (var i = 0; i < zombie.length; i++) {
            if (zombie[i].Zombie.offsetWidth != 0&&(zombie[i].Zombie.offsetLeft+40)>(This.zw.offsetLeft + This.zw.offsetWidth)) {
                clearInterval(This.timer);
                var js = zombie[i];
                This.shooterTimer = setInterval(function () {
                    var pb = This.createPB();
                    pb.timer = setInterval(function () {
                        pb.style.left = pb.offsetLeft + 11 + "px";
                        // 子弹击中僵尸
                        if (pb.offsetLeft >= js.Zombie.offsetLeft + 55) {
                            clearInterval(pb.timer);
                            pb.src = "images/plant/PeaBulletHit.gif";
                            setTimeout(function () {
                                dZombie.removeChild(pb);
                            }, 300)
                            js.blood--;

                            //僵尸靠近植物，未接触

                            if (js.blood == 2) {
                                js.lostHead();
                                js.walkNoHead();
                            } else if (js.blood == 1) {
                                js.down();
                            } else if (js.blood <= 0) {
                                js.die();
                            }
                        }
                        // 僵尸接触植物
                        if ((js.Zombie.offsetLeft + 40 ) <= (This.zw.offsetLeft + This.zw.offsetWidth) && js.blood >= 0 && This.blood >= 0) {
                            This.blood--;
                            if (This.blood == 0) {
                                This.die();
                                This.stopShoot();
                                if (js.blood == 2) {
                                    js.walkNoHead()
                                }
                                if (js.blood > 2) {
                                    js.walk();
                                }
                                return;
                            }
                            if (js.blood > 2) {
                                js.eatPlant();
                            } else if (js.blood == 2) {
                                js.lostHead();
                                js.eatPlantNoHead();
                            } else if (js.blood == 1) {
                                js.down();
                            } else if (js.blood <= 0) {
                                js.die();
                            }
                        }
                    }, 30);
                }, 2000);
            }
        }
    }, 30);
};
// 停止射击
Plant.prototype.stopShoot = function () {
    clearInterval(this.shooterTimer);
    clearInterval(this.timer);
    this.shooterTimer = null;
    this.timer = null;
    if(this.blood>0){
        this.shoot();
    }
}
// 植物死亡
Plant.prototype.die = function () {
    this.stopShoot();
    dPlants.removeChild(this.zw);
}
// 种植物
Plant.prototype.doplant = function () {
    this.zw.style.left = a;
    this.zw.style.top = b;
    dPlants.appendChild(this.zw);
}
// 创建子弹
Plant.prototype.createPB = function () {
    var pb = document.createElement("img");
    pb.src = "images/plant/PB00.gif";
    pb.style.position = "absolute";
    pb.style.left = this.zw.offsetLeft + 30 + "px";
    pb.style.top = this.zw.offsetTop - 3 + "px";
    pb.style.zIndex = 998;
    dZombie.appendChild(pb);
    return pb;
}


// 创建僵尸对象
function JS() {
    this.Zombie = this.init();
    this.blood = 10;
}
// 初始化僵尸
JS.prototype.init = function () {
    var js = document.createElement("div");
    js.style.left = "850px";
    js.innerHTML = ' <img src="images/interface/plantshadow32.png" alt="" ' +
        'style="position: absolute;left: 72px;top: 122px;"> <img src="images/Zombie/Zombie.gif" alt="">';
    dZombie.appendChild(js);
    return js;
}

// 正常走路
JS.prototype.walk = function () {
    var imgs = this.Zombie.getElementsByTagName("img");
    imgs[1].src = "images/Zombie/Zombie.gif";
    var This = this;
    This.walkTimer1 = setInterval(function () {
        This.Zombie.style.left = This.Zombie.offsetLeft - 1 + "px";
    }, 80);
}
// 无头行走
JS.prototype.walkNoHead = function () {
    var This = this;
    var imgs = this.Zombie.getElementsByTagName("img");
    imgs[1].src = "images/Zombie/ZombieLostHead.gif";
    This.walkTimer = setInterval(function () {
        This.Zombie.style.left = This.Zombie.offsetLeft - 1 + "px";
    }, 80)
}
// 头颅掉落
JS.prototype.lostHead = function () {
    this.stopwalk();
    var head = document.createElement("img");
    head.src = "images/Zombie/ZombieHead.gif";
    head.style.position = "absolute";
    head.style.zIndex = 889;
    head.style.left = this.Zombie.offsetLeft + "px";
    head.style.top = this.Zombie.offsetTop + "px";
    dZombie.appendChild(head);
    setTimeout(function () {
        dZombie.removeChild(head);
    }, 1000)
}
// 停止走路
JS.prototype.stopwalk = function () {
    clearInterval(this.walkTimer);
    clearInterval(this.walkTimer1);
    this.walkTimer = null;
    this.walkTimer1 = null;
}
// 吃植物
JS.prototype.eatPlant = function () {
    this.stopwalk();
    var imgs = this.Zombie.getElementsByTagName("img");
    imgs[1].src = "images/Zombie/ZombieAttack.gif";
}
// 无头吃植物
JS.prototype.eatPlantNoHead = function () {
    this.stopwalk();
    var imgs = this.Zombie.getElementsByTagName("img");
    imgs[1].src = "images/Zombie/ZombieLostHeadAttack.gif";
}
// 僵尸倒地
JS.prototype.down = function () {
    this.stopwalk();
    var imgs = this.Zombie.getElementsByTagName("img");
    imgs[1].src = "images/Zombie/ZombieDie.gif";
}
// 僵尸死亡
JS.prototype.die = function () {

    dZombie.removeChild(this.Zombie);
    this.stopwalk();

    for (var i = 0; i < plant.length; i++) {
        plant[i].stopShoot();
    }
    state++;
    if (state < 3) {
        setTimeout(function () {
            js[state].walk();
            zombie.push(js[state]);
        }, 3000);
        console.log(state);
    } else if (state < 4) {
        setTimeout(function () {
            js[state++].walk();
            zombie.push(js[3]);
            setTimeout(function () {
                js[state].walk();
                zombie.push(js[state]);
            }, 3000);
        }, 3000);
        console.log(state);
    }else if(zombie[zombie.length-1].Zombie.offsetWidth==0){
        console.log(state);
        alert("恭喜您闯关成功！！");
    }
}


var js = [];
for (var i = 0; i < 5; i++) {
    js[i] = new JS();
}

setTimeout(function () {
    js[0].walk();
    zombie.push(js[0]);
}, 7000);











