/*global XMLNS, XLINK, DEBUG, Player, Level, Debugger, ddd, UI*/
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
    this.collisionDetector = new CollisionDetector(this.player, this.level.tubes);

    this.viewPort.innerHTML = this.loadSprites();
    this.viewPort.setAttribute('viewBox', "0 0 " + (width) + " " + (height));
    this.viewPort.setAttribute('xmlns', XMLNS);
    this.viewPort.setAttribute('xmlns:xlink', XLINK);
    this.viewPort.setAttribute('width', width);
    this.viewPort.setAttribute('height', height);
    this.viewPort.setAttribute('style', "transform:" +
        " scale(2);transform-origin: center top;");

}

Game.prototype.init = function ()
{
    this.viewPort.appendChild(this.level.elm);
    this.viewPort.appendChild(this.player.elm);
    this.viewPort.appendChild(this.UI.elm);

    this.playBTN = this.viewPort.getElementById("play-btn");

    this.level.init();
    this.collisionDetector.init();
    this.playBTN.onmousedown = () =>{
        setTimeout(()=>{this.start();}, 0);
        this.playBTN.style.display = "none";
        (this.viewPort.getElementById("flappy-bird-text")).style.display = "none";
        (this.viewPort.getElementById("tap-ui")).style.display = "block";
    };
    /* /for dev
     window.ddd = new Debugger();
    if (DEBUG)
        this.viewPort.appendChild(ddd.elm);
    window.ddd.init(this.player, this.level);
    //end */

};

Game.prototype.setScore = function (score, quite)
{
    if (!quite)
        (new Audio('assets/sound/scored.mp3')).play();
    this.score = score;
    (this.viewPort.getElementById("live-score-ui")).innerHTML = this.score.toString();

};

Game.prototype.start = function ()
{
    this.player.rotation = 0;
    this.player.move(this.width / 3, this.height / 2.5);

    this.player.init();
    this.collisionDetector.init();
    (this.viewPort.getElementById("live-score-ui")).style.display = "block";
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
    let r;

    this.player.update();
    this.level.update();
    r = this.collisionDetector.update();
    if (r === -1)
    {
        (new Audio('assets/sound/death.mp3')).play();
        this.gameOver();
    }
    else if (r === 1)
        this.setScore(this.score + 1);
/*
    //for dev
    window.ddd.upDate(this.player, this.level);
    //end
    */
};

Game.prototype.gameOver = function ()
{
    clearInterval(this.intervalId);
    this.level.stop();
    this.player.stop();
    this.viewPort.onmousedown = null;
    if (this.score > this.bestScore)
        this.bestScore = this.score;
    (this.viewPort.getElementById("score-ui")).innerHTML = this.score.toString();
    (this.viewPort.getElementById("best-score-ui")).innerHTML = this.bestScore.toString();
    if (this.score < 3)
        (this.viewPort.getElementById("medal-ui")).setAttribute("fill", "rgba(0,0,0,0)");
    else if (this.score < 8)
        (this.viewPort.getElementById("medal-ui")).setAttribute("fill", "url(#medal-1-pattern)");
    else if (this.score < 15)
        (this.viewPort.getElementById("medal-ui")).setAttribute("fill", "url(#medal-2-pattern)");
    else if (this.score < 30)
        (this.viewPort.getElementById("medal-ui")).setAttribute("fill", "url(#medal-3-pattern)");
    else
        (this.viewPort.getElementById("medal-ui")).setAttribute("fill", "url(#medal-4-pattern)");
    (this.viewPort.getElementById("game-over-panel")).style.display = "block";
    (this.viewPort.getElementById("live-score-ui")).style.display = "none";
    setTimeout(()=>{
        this.playBTN.style.display = "block";
    }, 500);
    this.playBTN.onmousedown = () =>{
        this.setScore(0, true);
        setTimeout(()=>{this.start();}, 0);
        this.playBTN.style.display = "none";
        (this.viewPort.getElementById("game-over-panel")).style.display = "none";
        (this.viewPort.getElementById("tap-ui")).style.display = "block";
        (this.viewPort.getElementById("live-score-ui")).style.display = "block";
        this.level.init();
    };
};

Game.prototype.loadSprites = function ()
{
    return (this.player.getSprites() + this.level.getSprites() + this.UI.getSprites());
};
