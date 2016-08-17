/**
 * Created by huber on 21.01.2016.
 */

var functions = require("./functions");
var main = require("./main");
var player = require("./player");
var enemy = require("./enemys");

exports.draw = function (ctx,canvasWidth,canvasHeight) {
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(main.background,0,0);
    ctx.drawImage(main.imgC,900,450,300,200,0,0,1880,950);
    player.player.draw(ctx);
    exports.update(canvasHeight,canvasWidth);
    functions.drawScore(ctx);
    functions.drawUltimate(ctx);
    functions.shieldtimer(ctx);
    if (main.score > 30 && main.score < 100) {
        player.wepUpgrade.draw(ctx);
        if (player.wepUpgrade.x + 50 > player.player.x && player.wepUpgrade.x < player.player.x + 50 && player.wepUpgrade.y + 50 > player.player.y && player.wepUpgrade.y < player.player.y + 50) {
            main.score += 5;
            player.player.wepUp = 1;
        }
    }
    if(player.shield.onoff === 2) {
        player.shield.draw(ctx);
    }
    main.bulletstash.forEach(function (bullet) {
        bullet.x += bullet.vx * 7;
        bullet.y += bullet.vy * 7;
        bullet.draw(ctx);
    });

    main.enemystash.forEach(function (enemy) {
        enemy.x += enemy.vx * 2;
        enemy.y += enemy.vy * 2;
        enemy.draw(ctx);
    });

    main.enemystashV2.forEach(function (enemyV2) {
        enemyV2.x += enemyV2.vx;
        enemyV2.y += enemyV2.vy;
        enemyV2.draw(ctx);
    });

    main.enemydestruction.forEach(function (enemyDestruction) {
        enemyDestruction.x += enemyDestruction.vx ;
        enemyDestruction.y += enemyDestruction.vy;
        enemyDestruction.timeleft += 1;
        enemyDestruction.draw(ctx);
    });

    main.enemydestructionv2.forEach(function (enemyDestructionV2) {
        enemyDestructionV2.x += enemyDestructionV2.vx;
        enemyDestructionV2.y += enemyDestructionV2.vy;
        enemyDestructionV2.timeleft += 1;
        enemyDestructionV2.draw(ctx);
    });



    if (player.player.y > canvasHeight) {
        player.player.y = canvasHeight;
    }
    if (player.player.x > canvasWidth) {
        player.player.x = canvasWidth;
    }
    if (player.player.y < 0) {
        player.player.y = 0;
    }
    if (player.player.x < 0) {
        player.player.x = 0;
    }
}
exports.update = function(canvasHeight,canvasWidth) {
    for (var i = 0; i < main.bulletstash.length; i++) {
        if (main.bulletstash[i].y > canvasHeight || main.bulletstash[i].y < 0 || main.bulletstash[i].x > canvasWidth || main.bulletstash[i].x < 0) {
            main.bulletstash.splice(i, 1);
        }
    }
    if (main.enemystash.length > 0 && main.bulletstash.length > 0) {
        for (var i = 0; i < main.enemystash.length; i++) {
            for (var j = 0; j < main.bulletstash.length; j++) {
                if (main.enemystash[i].x + 15 > main.bulletstash[j].x && main.enemystash[i].x < main.bulletstash[j].x + 15 && main.enemystash[i].y + 15 > main.bulletstash[j].y && main.enemystash[i].y < main.bulletstash[j].y + 15) {
                    main.bulletstash.splice(j, 1);
                    main.score++;
                    for(var k = 0;k < 41;k++) {
                        var vecX = 1800 - player.player.x;
                        var vecY = 0 - player.player.y;
                        var curAng = Math.atan2(vecY, vecX);
                        var leftAng = curAng + Math.PI / 20 * k;
                        var leftAX = Math.cos(leftAng);
                        var leftAY = Math.sin(leftAng);
                        var newDestru = Object.create(enemy.enemyDestruction);
                        newDestru.x = main.enemystash[i].x;
                        newDestru.y = main.enemystash[i].y;
                        newDestru.vx = leftAX*((Math.random() * 2) + 1);
                        newDestru.vy = leftAY*((Math.random() * 2) + 1);
                        newDestru.timeleft = enemy.enemyDestruction.timeleft;
                        main.enemydestruction.push(newDestru);
                    }
                    main.enemystash.splice(i, 1);

                }
            }
        }
    }
    for (var i = 0; i < main.enemystash.length; i++) {
        if (main.enemystash[i].x + 20 > player.player.x && main.enemystash[i].x < player.player.x + 20 && main.enemystash[i].y + 20 > player.player.y && main.enemystash[i].y < player.player.y + 20) {
            main.enemystash.length = 0;
            main.enemystashV2.length = 0;
            main.bulletstash.length = 0;
            main.enemydestruction.length = 0;
            main.enemydestructionv2.length = 0;
            player.shield.onoff = 1;
            player.player.x = 900;
            player.player.y = 450;
            main.score = 0;
            player.player.wepUp = 0;
        }
    }

    if (main.enemystashV2.length > 0 && main.bulletstash.length > 0) {
        for (var i = 0; i < main.enemystashV2.length; i++) {
            for (var j = 0; j < main.bulletstash.length; j++) {
                if (main.enemystashV2[i].x + 20 > main.bulletstash[j].x && main.enemystashV2[i].x < main.bulletstash[j].x + 20 && main.enemystashV2[i].y + 20 > main.bulletstash[j].y && main.enemystashV2[i].y < main.bulletstash[j].y + 20) {
                    main.bulletstash.splice(j, 1);
                    main.enemystashV2[i].hits ++;
                    main.score++;
                    if(main.enemystashV2[i].hits > 2)
                    {
                        for(var k = 0;k < 41;k++) {
                            var vecX = 1800 - player.player.x;
                            var vecY = 0 - player.player.y;
                            var curAng = Math.atan2(vecY, vecX);
                            var leftAng = curAng + Math.PI / 20 * k;
                            var leftAX = Math.cos(leftAng);
                            var leftAY = Math.sin(leftAng);
                            var newDestru = Object.create(enemy.enemyDestructionV2);
                            newDestru.x = main.enemystashV2[i].x;
                            newDestru.y = main.enemystashV2[i].y;
                            newDestru.vx = leftAX*((Math.random() * 3) + 1);
                            newDestru.vy = leftAY*((Math.random() * 3) + 1);
                            newDestru.timeleft = enemy.enemyDestructionV2.timeleft;
                            main.enemydestructionv2.push(newDestru);
                        }
                        main.enemystashV2.splice(i,1);
                    }
                }
            }
        }
    }
    for (var i = 0; i < main.enemystashV2.length; i++) {
        if (main.enemystashV2[i].x + 20 > player.player.x && main.enemystashV2[i].x < player.player.x + 20 && main.enemystashV2[i].y + 20  > player.player.y && main.enemystashV2[i].y < player.player.y + 20) {
            main.enemystash.length = 0;
            main.enemystashV2.length = 0;
            main.bulletstash.length = 0;
            main.enemydestruction.length = 0;
            main.enemydestructionv2.length = 0;
            player.shield.onoff = 1;
            player.player.x = 900;
            player.player.y = 450;
            main.score = 0;
            player.player.wepUp = 0;
        }
    }

    if(player.shield.onoff === 2) {
        for (var i = 0; i < main.enemystash.length; i++) {
            var dx = main.enemystash[i].x - player.shield.x;
            var dy = main.enemystash[i].y - player.shield.y;
            var distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 55 + 7.5) {
                main.enemystash[i].vx = -(main.enemystash[i].vx);
                main.enemystash[i].vy = -(main.enemystash[i].vy);
                main.enemystash[i].x = main.enemystash[i].x + dx / 8;
                main.enemystash[i].y = main.enemystash[i].y + dy / 8;
            }
        }
    }


    for(var i = 0; i < main.enemydestruction.length;i++) {
        if(main.enemydestruction[i].timeleft > 60) {
            main.enemydestruction.splice(i,1);
        }
    }
    for(var i = 0; i < main.enemydestructionv2.length;i++) {
        if(main.enemydestructionv2[i].timeleft > 90) {
            main.enemydestructionv2.splice(i,1);
        }
    }

    if (main.keys[65]) {
        player.player.x -= player.player.vx;
    }
    if (main.keys[68]) {
        player.player.x += player.player.vx;
    }
    if (main.keys[87]) {
        player.player.y -= player.player.vy;
    }
    if (main.keys[83]) {
        player.player.y += player.player.vy;
    }

    player.cursor.curVec = Math.atan2(player.cursor.y - player.player.y, player.cursor.x - player.player.x);
    player.player.angle = player.cursor.curVec;
    player.shield.x = player.player.x;
    player.shield.y = player.player.y;

};