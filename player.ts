/**
 * Created by huber on 21.01.2016.
 */

var functions = require("./functions");
var main = require("./main");
var mainLoop = require("./mainLoop");

var player = {
    x: 900,
    y: 450,
    vx: 4,
    vy: 4,
    wepUp: 0,
    ultimate: 1,
    color: "#b48441",
    angle: 0,
    draw: function (ctx) {
        ctx.save();
        ctx.translate(this.x,this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(main.playerimg,-20,-20,40,40);
        ctx.restore();
    }
};
var shield = {
    x:player.x,
    y:player.y,
    onoff: 1,
    draw: function(ctx) {
        functions.spritesheet.update();
        functions.spritesheet.draw(player.x -95,player.y-80,ctx);
    }
};

var cursor = {
    x:0,
    y:0,
    curVec:0
};

var bullet = {
    x: player.x,
    y: player.y,
    vx: 0,
    vy: 0,
    draw: function (ctx) {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 2, 0, Math.PI * 2, true);
        ctx.closePath();
        ctx.fillStyle = "yellow";
        ctx.fill();
    }
};

var wepUpgrade = {
    x: Math.floor(Math.random() * 1780) + 100,
    y:  Math.floor(Math.random() * 850) + 100,
    draw: function (ctx) {
        ctx.drawImage(main.img, this.x -25, this.y -25, 50, 50);
    }
};


exports.player = player;
exports.cursor = cursor;
exports.shield = shield;
exports.bullet = bullet;
exports.wepUpgrade = wepUpgrade;
