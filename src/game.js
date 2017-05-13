function Game (width, height)
{
    this.t = 16;//16 is for 60fps
    this.interval = 0;
    this.viewPort = document.createElementNS(XMLNS, 'svg');
    this.player = new Player();
    this.level = new Level(width, height);
    //this.collisionDetector = new CollisionDetector();

    //for dev
    window.ddd = new Debugger();
    //end

    this.viewPort.innerHTML = this.loadSprites();
    this.viewPort.setAttribute('viewBox', "0 0 " + width + " " + height);
    this.viewPort.setAttribute('xmlns', XMLNS);
    this.viewPort.setAttribute('xmlns:xlink', XLINK);
    this.viewPort.setAttribute('width', width);
    this.viewPort.setAttribute('height', height);
    //for dev
    this.viewPort.setAttribute('style', "zoom:2.5;");
    //end
    this.player.move(width / 3, height / 2);
}

Game.prototype.init = function ()
{
    this.viewPort.appendChild(this.level.elm);
    this.viewPort.appendChild(this.player.elm);
    this.level.init();

    //for dev
    if (DEBUG)
        this.viewPort.appendChild(ddd.elm);
    window.ddd.init(this.player, this.level);
    //end
};

Game.prototype.start = function ()
{
    //todo touch
    this.player.start();
    this.level.start();
    this.viewPort.onmousedown = ()=>{
        let jumpSound = new Audio('assets/sound/fly.mp3');

        this.player.start();
        this.level.start();
        jumpSound.play();
        this.interval = setInterval(this.update.bind(this), this.t);
        this.viewPort.onmousedown = ()=>{
            jumpSound = new Audio('assets/sound/fly.mp3');

            this.player.jump();
            jumpSound.play();
        };
    };
};

Game.prototype.update = function ()
{
    this.player.update();
    this.level.update();
    /*
    if (this.collisionDetector.check(this.player, this.level.obstacles))
        //hit
    */

    //for dev
    window.ddd.upDate(this.player, this.level);
    //end
};

Game.prototype.loadSprites = function ()
{
    return (this.player.getSprites() + this.level.getSprites());
};

Game.prototype.reset = function ()
{

};