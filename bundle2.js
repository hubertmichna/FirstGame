/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 29.01.2016.
	 */
	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var mainLoop = __webpack_require__(2);
	var enemys = __webpack_require__(5);
	var functions = __webpack_require__(3);
	var player = __webpack_require__(4);
	var event = __webpack_require__(6);
	window.onload = function () {
	    var canvas = document.getElementById('myCanvas');
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
	    var backgroundaudio = document.getElementById("background");
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
	    setInterval(function () { return functions.addenemy(canvas.width, canvas.height); }, 100);
	    setInterval(function () { return functions.addenemyV2(canvas.width, canvas.height); }, 1000);
	    setInterval(functions.updateUltimate, 5000);
	    setInterval(function () { return mainLoop.draw(ctx, canvas.width, canvas.height); }, 10);
	};


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var functions = __webpack_require__(3);
	var main = __webpack_require__(1);
	var player = __webpack_require__(4);
	var enemy = __webpack_require__(5);
	exports.draw = function (ctx, canvasWidth, canvasHeight) {
	    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
	    ctx.drawImage(main.background, 0, 0);
	    ctx.drawImage(main.imgC, 900, 450, 300, 200, 0, 0, 1880, 950);
	    player.player.draw(ctx);
	    exports.update(canvasHeight, canvasWidth);
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
	    if (player.shield.onoff === 2) {
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
	        enemyDestruction.x += enemyDestruction.vx;
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
	};
	exports.update = function (canvasHeight, canvasWidth) {
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
	                    for (var k = 0; k < 41; k++) {
	                        var vecX = 1800 - player.player.x;
	                        var vecY = 0 - player.player.y;
	                        var curAng = Math.atan2(vecY, vecX);
	                        var leftAng = curAng + Math.PI / 20 * k;
	                        var leftAX = Math.cos(leftAng);
	                        var leftAY = Math.sin(leftAng);
	                        var newDestru = Object.create(enemy.enemyDestruction);
	                        newDestru.x = main.enemystash[i].x;
	                        newDestru.y = main.enemystash[i].y;
	                        newDestru.vx = leftAX * ((Math.random() * 2) + 1);
	                        newDestru.vy = leftAY * ((Math.random() * 2) + 1);
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
	                    main.enemystashV2[i].hits++;
	                    main.score++;
	                    if (main.enemystashV2[i].hits > 2) {
	                        for (var k = 0; k < 41; k++) {
	                            var vecX = 1800 - player.player.x;
	                            var vecY = 0 - player.player.y;
	                            var curAng = Math.atan2(vecY, vecX);
	                            var leftAng = curAng + Math.PI / 20 * k;
	                            var leftAX = Math.cos(leftAng);
	                            var leftAY = Math.sin(leftAng);
	                            var newDestru = Object.create(enemy.enemyDestructionV2);
	                            newDestru.x = main.enemystashV2[i].x;
	                            newDestru.y = main.enemystashV2[i].y;
	                            newDestru.vx = leftAX * ((Math.random() * 3) + 1);
	                            newDestru.vy = leftAY * ((Math.random() * 3) + 1);
	                            newDestru.timeleft = enemy.enemyDestructionV2.timeleft;
	                            main.enemydestructionv2.push(newDestru);
	                        }
	                        main.enemystashV2.splice(i, 1);
	                    }
	                }
	            }
	        }
	    }
	    for (var i = 0; i < main.enemystashV2.length; i++) {
	        if (main.enemystashV2[i].x + 20 > player.player.x && main.enemystashV2[i].x < player.player.x + 20 && main.enemystashV2[i].y + 20 > player.player.y && main.enemystashV2[i].y < player.player.y + 20) {
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
	    if (player.shield.onoff === 2) {
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
	    for (var i = 0; i < main.enemydestruction.length; i++) {
	        if (main.enemydestruction[i].timeleft > 60) {
	            main.enemydestruction.splice(i, 1);
	        }
	    }
	    for (var i = 0; i < main.enemydestructionv2.length; i++) {
	        if (main.enemydestructionv2[i].timeleft > 90) {
	            main.enemydestructionv2.splice(i, 1);
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


/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var main = __webpack_require__(1);
	var player = __webpack_require__(4);
	var enemy = __webpack_require__(5);
	var mainLoop = __webpack_require__(2);
	var event = __webpack_require__(6);
	exports.SpriteSheet = function (path, frameWidth, frameHeight, frameSpeed, endFrame) {
	    var image = new Image();
	    var framesPerRow;
	    var self = this;
	    image.onload = function () {
	        framesPerRow = Math.floor(image.width / frameWidth);
	    };
	    image.src = path;
	    var currentFrame = 0;
	    var counter = 0;
	    this.update = function () {
	        if (counter == (frameSpeed - 1))
	            currentFrame = (currentFrame + 1) % endFrame;
	        counter = (counter + 1) % frameSpeed;
	    };
	    this.draw = function (x, y, ctx) {
	        var row = Math.floor(currentFrame / framesPerRow);
	        var col = Math.floor(currentFrame % framesPerRow);
	        ctx.drawImage(image, col * frameWidth, row * frameHeight, frameWidth, frameHeight, x, y, frameWidth, frameHeight);
	    };
	};
	exports.drawScore = function (ctx) {
	    ctx.font = "35px Arial";
	    ctx.fillStyle = "white";
	    ctx.fillText("Score: " + main.score, 10, 940);
	};
	exports.shieldtimer = function (ctx) {
	    ctx.font = "35px Arial";
	    if (player.shield.onoff === 0) {
	        ctx.fillStyle = "white";
	    }
	    if (player.shield.onoff === 1) {
	        ctx.fillStyle = "green";
	    }
	    if (player.shield.onoff === 2) {
	        ctx.fillStyle = "yellow";
	    }
	    ctx.fillText("Shield", 10, 860);
	};
	exports.drawUltimate = function (ctx) {
	    ctx.font = "35px Arial";
	    ctx.fillStyle = "white";
	    if (player.player.ultimate === 0) {
	        ctx.fillStyle = "white";
	    }
	    else {
	        ctx.fillStyle = "green";
	    }
	    ctx.fillText("Ultimate", 10, 900);
	};
	exports.updateUltimate = function () {
	    player.player.ultimate = 1;
	};
	exports.addenemyV2 = function (canvasWidth, canvasHeight) {
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
	exports.addenemy = function (canvasWidth, canvasHeight) {
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


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var functions = __webpack_require__(3);
	var main = __webpack_require__(1);
	var mainLoop = __webpack_require__(2);
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
	        ctx.translate(this.x, this.y);
	        ctx.rotate(this.angle);
	        ctx.drawImage(main.playerimg, -20, -20, 40, 40);
	        ctx.restore();
	    }
	};
	var shield = {
	    x: player.x,
	    y: player.y,
	    onoff: 1,
	    draw: function (ctx) {
	        functions.spritesheet.update();
	        functions.spritesheet.draw(player.x - 95, player.y - 80, ctx);
	    }
	};
	var cursor = {
	    x: 0,
	    y: 0,
	    curVec: 0
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
	    y: Math.floor(Math.random() * 850) + 100,
	    draw: function (ctx) {
	        ctx.drawImage(main.img, this.x - 25, this.y - 25, 50, 50);
	    }
	};
	exports.player = player;
	exports.cursor = cursor;
	exports.shield = shield;
	exports.bullet = bullet;
	exports.wepUpgrade = wepUpgrade;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var main = __webpack_require__(1);
	var player = __webpack_require__(4);
	var enemy = {
	    x: 0,
	    y: 0,
	    vx: 0,
	    vy: 0,
	    draw: function (ctx) {
	        ctx.drawImage(main.meteor, this.x - 7.5, this.y - 7.5, 15, 15);
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
	        ctx.drawImage(main.meteorV2, this.x - 20, this.y - 20, 40, 40);
	    }
	};
	var enemyDestruction = {
	    x: 0,
	    y: 0,
	    vx: 0,
	    vy: 0,
	    timeleft: 0,
	    draw: function (ctx) {
	        ctx.drawImage(main.meteor, this.x - 5, this.y - 5, 5, 5);
	    }
	};
	var enemyDestructionV2 = {
	    x: 0,
	    y: 0,
	    vx: 0,
	    vy: 0,
	    timeleft: 0,
	    angle: 0,
	    draw: function (ctx) {
	        ctx.drawImage(main.meteorV2, this.x - 5, this.y - 5, 10, 10);
	        ctx.rotate(this.angle);
	    }
	};
	exports.enemy = enemy;
	exports.enemyV2 = enemyV2;
	exports.enemyDestruction = enemyDestruction;
	exports.enemyDestructionV2 = enemyDestructionV2;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Created by huber on 21.01.2016.
	 */
	var main = __webpack_require__(1);
	var player = __webpack_require__(4);
	var enemy = __webpack_require__(5);
	var mainLoop = __webpack_require__(2);
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
	document.body.addEventListener("keydown", function (event) {
	    if (player.shield.onoff === 1) {
	        switch (event.keyCode) {
	            case 81:
	                player.shield.onoff = 2;
	                main.shieldaudio.play();
	                setTimeout(function () { player.shield.onoff = 0; }, 3600);
	                setTimeout(function () { player.shield.onoff = 1; }, 10000);
	        }
	    }
	    if (player.player.ultimate === 1) {
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


/***/ }
/******/ ]);