/**
 * Created by huber on 21.01.2016.
 */

var main = require("./main");
var player = require("./player");
var enemy = require("./enemys");
var mainLoop = require("./mainLoop");
var event = require("./eventlisteners");

exports.SpriteSheet = function (path, frameWidth, frameHeight, frameSpeed, endFrame) {

    var image = new Image();
    var framesPerRow;


    var self = this;
    image.onload = function() {
        framesPerRow = Math.floor(image.width / frameWidth);
    };

    image.src = path;

    var currentFrame = 0;
    var counter = 0;


    this.update = function() {


        if (counter == (frameSpeed - 1))
            currentFrame = (currentFrame + 1) % endFrame;


        counter = (counter + 1) % frameSpeed;
    };

    this.draw = function(x, y,ctx) {
        var row = Math.floor(currentFrame / framesPerRow);
        var col = Math.floor(currentFrame % framesPerRow);

        ctx.drawImage(
            image,
            col * frameWidth, row * frameHeight,
            frameWidth, frameHeight,
            x, y,
            frameWidth, frameHeight);
    };
};



exports.drawScore = function(ctx) {
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + main.score, 10, 940);
};

exports.shieldtimer = function(ctx) {
    ctx.font = "35px Arial";
    if(player.shield.onoff === 0) {
        ctx.fillStyle = "white";
    } if(player.shield.onoff === 1) {
        ctx.fillStyle = "green";
    } if(player.shield.onoff === 2) {
        ctx.fillStyle = "yellow";
    }
    ctx.fillText("Shield", 10, 860);
}

exports.drawUltimate = function(ctx) {
    ctx.font = "35px Arial";
    ctx.fillStyle = "white";
    if(player.player.ultimate === 0)
    {
        ctx.fillStyle = "white";
    } else {
        ctx.fillStyle = "green";
    }
    ctx.fillText("Ultimate", 10, 900);
};

exports.updateUltimate = function() {
    player.player.ultimate = 1;
}

exports.addenemyV2 = function(canvasWidth,canvasHeight) {
    var enemyVecX = player.player.x - Math.floor((Math.random() * canvasWidth) + 1);
    var enemyVecY = player.player.y - enemy.enemyV2.y;
    var enemyVecLen = Math.sqrt(enemyVecX * enemyVecX + enemyVecY * enemyVecY);
    var newEnemy = Object.create(enemy.enemyV2);
    newEnemy.x = Math.floor((Math.random() * canvasWidth) + 1);
    newEnemy.y = enemy.enemyV2.y;
    newEnemy.hits = enemy.enemyV2.hits;
    newEnemy.vx = enemyVecX / enemyVecLen;
    newEnemy.vy = enemyVecY / enemyVecLen;
    main.enemystashV2.push(newEnemy);
    for (var j = 0; j < main.enemystashV2.length; j++) {
        if (main.enemystashV2[j].y > canvasHeight || main.enemystashV2[j].y < 0 || main.enemystashV2[j].x > canvasWidth || main.enemystashV2[j].x < 0) {
            main.enemystashV2.splice(j, 1);
        }
    }
    ;

};

exports.addenemy = function(canvasWidth,canvasHeight) {
    var enemyVecX = player.player.x - Math.floor((Math.random() * canvasWidth) + 1);
    var enemyVecY = player.player.y - enemy.enemy.y;
    var enemyVecLen = Math.sqrt(enemyVecX * enemyVecX + enemyVecY * enemyVecY);
    var newEnemy = Object.create(enemy.enemy);
    newEnemy.x = Math.floor((Math.random() * canvasWidth) + 1);
    newEnemy.y = enemy.enemy.y;
    newEnemy.vx = enemyVecX / enemyVecLen;
    newEnemy.vy = enemyVecY / enemyVecLen;
    main.enemystash.push(newEnemy);
    for (var j = 0; j < main.enemystash.length; j++) {
        if (main.enemystash[j].y > canvasHeight || main.enemystash[j].y < 0 || main.enemystash[j].x > canvasWidth || main.enemystash[j].x < 0) {
            main.enemystash.splice(j, 1);
        }
    }
    ;

};