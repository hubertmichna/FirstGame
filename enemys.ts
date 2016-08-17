/**
 * Created by huber on 21.01.2016.
 */
var main = require("./main");
var player = require("./player");

var enemy = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    draw: function (ctx) {
        ctx.drawImage(main.meteor,this.x -7.5,this.y - 7.5,15,15);
    }
};

var enemyV2 = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    hits: 0,
    color: "#f13368",
    draw: function (ctx) {
        ctx.drawImage(main.meteorV2,this.x - 20,this.y - 20,40,40);
    }
};

var enemyDestruction = {
    x:0,
    y:0,
    vx:0,
    vy:0,
    timeleft: 0,
    draw: function (ctx) {
        ctx.drawImage(main.meteor,this.x-5,this.y-5,5,5);
    }
};

var enemyDestructionV2 = {
    x:0,
    y:0,
    vx:0,
    vy:0,
    timeleft: 0,
    angle: 0,
    draw: function (ctx) {
        ctx.drawImage(main.meteorV2,this.x -5,this.y-5,10,10);
        ctx.rotate(this.angle);
    }
};

exports.enemy = enemy;
exports.enemyV2 = enemyV2;
exports.enemyDestruction = enemyDestruction;
exports.enemyDestructionV2 = enemyDestructionV2;

