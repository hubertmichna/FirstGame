/**
 * Created by huber on 21.01.2016.
 */

var mainLoop = require("./mainLoop");
var enemys = require("./enemys");
var functions = require("./functions");
var player = require("./player");
var event = require("./eventlisteners");


    window.onload = function() {

        var canvas = <HTMLCanvasElement>document.getElementById('myCanvas');
        var ctx = canvas.getContext('2d');

        var imgC = new Image();
        imgC.src = ctx.canvas.toDataURL("image/png");
        exports.imgC = imgC;

        var keys = [];
        exports.keys = keys;
        var enemystash = [];
        exports.enemystash = enemystash;
        var enemystashV2 = [];
        exports.enemystashV2 = enemystashV2;
        var bulletstash = [];
        exports.bulletstash = bulletstash;
        var enemydestruction = [];
        exports.enemydestruction = enemydestruction;
        var enemydestructionv2 = [];
        exports.enemydestructionv2 = enemydestructionv2;
        var score = 0;
        exports.score = score;

        var bulletaudio = document.getElementById("bullet");
        exports.bulletaudio = bulletaudio;
        var shieldaudio = document.getElementById("shield");
        exports.shieldaudio = shieldaudio;
        var ultimateaudio = document.getElementById("ultimate");
        exports.ultimateaudio = ultimateaudio;
        var backgroundaudio = <HTMLAudioElement>document.getElementById("background");
        backgroundaudio.volume = 0.2;
        backgroundaudio.play();
        var enemyv1audio = document.getElementById("enemyv1");
        var enemyv2audio = document.getElementById("enemyv2");


        var img = document.getElementById("upgrade");
        exports.img = img;

        var background = new Image();
        background.src = "http://www.desktop-image.com/wp-content/uploads/2014/06/space-wallpaper-1920x10801.jpg";
        exports.background = background;

        var meteor = new Image();
        meteor.src = "http://vignette2.wikia.nocookie.net/goldensun/images/0/0a/Meteor.gif/revision/latest?cb=20080313190410";
        exports.meteor = meteor;

        var meteorV2 = new Image();
        meteorV2.src = "http://i.imgur.com/UrlKcD4.png";
        exports.meteorV2 = meteorV2;

        var playerimg = new Image();
        playerimg.src = "http://1.bp.blogspot.com/-SqwrVIJoXXY/U9vXJm7TiiI/AAAAAAAABwU/DyQAiOXcIgU/s1600/blueships1.png";
        exports.playerimg = playerimg;

        var shieldimg = new Image();
        shieldimg.src = "http://opengameart.org/sites/default/files/spr_shield.png";

        functions.spritesheet = new functions.SpriteSheet('http://i215.photobucket.com/albums/cc221/Tharis_saviors/magic_007_zpsa3bf7cc6.png', 192, 192, 6, 20);




        setInterval(() => functions.addenemy(canvas.width, canvas.height),100);
        setInterval(() => functions.addenemyV2(canvas.width, canvas.height),1000);
        setInterval(functions.updateUltimate,5000);
        setInterval(() => mainLoop.draw(ctx,canvas.width, canvas.height), 10);
    };
