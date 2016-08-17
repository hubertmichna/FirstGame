/**
 * Created by huber on 21.01.2016.
 */

var main = require("./main");
var player = require("./player");
var enemy = require("./enemys");
var mainLoop = require("./mainLoop");

document.body.addEventListener("click", function (event) {
    var kupa = main.bulletaudio.cloneNode(true);
    kupa.volume = 0.1;
    kupa.play();
    var ex = event.clientX;
    var ey = event.clientY;
    var vecX = ex - player.player.x;
    var vecY = ey - player.player.y;
    var vecLen = Math.sqrt(vecX * vecX + vecY * vecY);
    var newBullet = Object.create(player.bullet);
    newBullet.x = player.player.x;
    newBullet.y = player.player.y;
    newBullet.vx = vecX / vecLen;
    newBullet.vy = vecY / vecLen;
    main.bulletstash.push(newBullet);

    if (player.player.wepUp === 1) {
        var currsorAngle = Math.atan2(vecY, vecX);
        var leftAngle = currsorAngle - Math.PI / 14;
        var leftVX = Math.cos(leftAngle);
        var leftVY = Math.sin(leftAngle);
        var newBullet = Object.create(player.bullet);
        newBullet.x = player.player.x;
        newBullet.y = player.player.y;
        newBullet.vx = leftVX;
        newBullet.vy = leftVY;
        main.bulletstash.push(newBullet);
    }
    if (player.player.wepUp === 1) {
        var currsorAngle = Math.atan2(vecY, vecX);
        var leftAngle = currsorAngle + Math.PI / 14;
        var leftVX = Math.cos(leftAngle);
        var leftVY = Math.sin(leftAngle);
        var newBullet = Object.create(player.bullet);
        newBullet.x = player.player.x;
        newBullet.y = player.player.y;
        newBullet.vx = leftVX;
        newBullet.vy = leftVY;
        main.bulletstash.push(newBullet);
    }

});

document.body.addEventListener("keydown", function(event){
    if(player.shield.onoff === 1) {
        switch (event.keyCode) {
            case 81:
                player.shield.onoff = 2;
                main.shieldaudio.play();
                setTimeout(function(){player.shield.onoff = 0},3600);
                setTimeout(function(){player.shield.onoff = 1},10000);
        }
    }
    if(player.player.ultimate === 1) {
        switch (event.keyCode) {
            case 32:
                main.ultimateaudio.cloneNode(true).play();
                for (var i = 0; i < 41; i++) {
                    var vecX = 1800 - player.player.x;
                    var vecY = 0 - player.player.y;
                    var curAng = Math.atan2(vecY, vecX);
                    var leftAng = curAng + Math.PI / 20 * i;
                    var leftAX = Math.cos(leftAng);
                    var leftAY = Math.sin(leftAng);
                    var newBullet = Object.create(player.bullet);
                    newBullet.x = player.player.x;
                    newBullet.y = player.player.y;
                    newBullet.vx = leftAX;
                    newBullet.vy = leftAY;
                    main.bulletstash.push(newBullet);
                }
                player.player.ultimate = 0;
        }
    }
});

document.body.addEventListener("mousemove", function (event) {
    player.cursor.x = event.clientX;
    player.cursor.y = event.clientY;
});

document.body.addEventListener("keydown", function (e) {
    main.keys[e.keyCode] = true;
});

document.body.addEventListener("keyup", function (e) {
    main.keys[e.keyCode] = false;
});

