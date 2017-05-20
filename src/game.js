/*global XMLNS, XLINK, DEBUG, Player, Level, Debugger, ddd*/
'use strict';

function Game (width, height)
{
    this.width = width;
    this.height = height;
    this.t = 1;//16 is for 60fps
    this.intervalId = 0;
    this.viewPort = document.createElementNS(XMLNS, 'svg');
    this.player = new Player();
    this.level = new Level(width, height);
    this.UI = new UI(width, height);
    this.playBTN = {};
    this.score = 0;
    this.bestScore = 0;
    //this.collisionDetector = new CollisionDetector();

    this.viewPort.innerHTML = this.loadSprites();
    this.viewPort.setAttribute('viewBox', "0 0 " + width + " " + height);
    this.viewPort.setAttribute('xmlns', XMLNS);
    this.viewPort.setAttribute('xmlns:xlink', XLINK);
    this.viewPort.setAttribute('width', width);
    this.viewPort.setAttribute('height', height);
}

Game.prototype.init = function ()
{
    this.viewPort.appendChild(this.level.elm);
    this.viewPort.appendChild(this.UI.elm);
    this.playBTN = this.viewPort.getElementById("play-btn");
    this.level.init();

    this.playBTN.onmousedown = () =>{
        setTimeout(()=>{this.start();}, 0);
        this.playBTN.style.display = "none";
        (this.viewPort.getElementById("flappy-bird-text")).style.display = "none";
        (this.viewPort.getElementById("tap-ui")).style.display = "block";
        this.viewPort.appendChild(this.player.elm);
    };
    //for dev
    window.ddd = new Debugger();
    this.viewPort.setAttribute('style', "zoom:2.5;");
    if (DEBUG)
        this.viewPort.appendChild(ddd.elm);
    window.ddd.init(this.player, this.level);
    //end

};

Game.prototype.start = function ()
{
    this.player.rotation = 0;
    this.player.move(this.width / 3, this.height / 2.5);

    //todo touch
    this.player.init();
    this.viewPort.onmousedown = ()=>{
        (new Audio('assets/sound/fly.mp3')).play();
        (this.viewPort.getElementById("tap-ui")).style.display = "none";
        this.player.start();
        this.level.start();
        this.intervalId = setInterval(this.update.bind(this), this.t);
        this.viewPort.onmousedown = ()=>{
            (new Audio('assets/sound/fly.mp3')).play();
            this.player.jump();
        };
    };
};

Game.prototype.update = function ()
{
    this.player.update();
    this.level.update();
    if (this.player.position.y > 202)
    {
        (new Audio('assets/sound/death.mp3')).play();
        this.gameOver();
        //todo sound
    }
    /*
    if (this.collisionDetector.check(this.player, this.level.obstacles))
        //hit
    */

    //for dev
    window.ddd.upDate(this.player, this.level);
    //end
};

Game.prototype.gameOver = function ()
{
    clearInterval(this.intervalId);
    this.level.stop();
    this.player.stop();
    this.viewPort.onmousedown = null;
    //todo show playBTN score bestScore medal
    (this.viewPort.getElementById("score-ui")).innerHTML = this.score.toString();
    (this.viewPort.getElementById("best-score-ui")).innerHTML = this.bestScore.toString();
    (this.viewPort.getElementById("game-over-ui")).style.display = "block";
    (this.viewPort.getElementById("score-panel-ui")).style.display = "block";
    (this.viewPort.getElementById("score-ui")).style.display = "block";
    (this.viewPort.getElementById("best-score-ui")).style.display = "block";
    setTimeout(()=>{
        this.playBTN.style.display = "block";
    }, 500);
    this.playBTN.onmousedown = () =>{
        setTimeout(()=>{this.start();}, 0);
        this.playBTN.style.display = "none";
        (this.viewPort.getElementById("game-over-ui")).style.display = "none";
        (this.viewPort.getElementById("score-panel-ui")).style.display = "none";
        (this.viewPort.getElementById("score-ui")).style.display = "none";
        (this.viewPort.getElementById("best-score-ui")).style.display = "none";
        (this.viewPort.getElementById("tap-ui")).style.display = "block";
        this.level.init();
        //hide show playBTN score bestScore medal
    };
};

Game.prototype.restart = function ()
{

};

Game.prototype.loadSprites = function ()
{
    return (this.player.getSprites() + this.level.getSprites() + this.UI.getSprites());
};


Game.prototype.loadFirstScreen = function ()
{

};