/*global XMLNS*/
'use strict';

function Player ()
{
    this.position = {x: 0, y: 0};
    this.rotation = 0;
    this.intervalId = 0;
    //todo fall at
    this.property = {spriteId: 1, r: 8, g: 10, v0: 50, fallAt: 0, yFall: 0};
    this.elm = document.createElementNS(XMLNS, 'g');
    this.elm.innerHTML = '<circle id="player" cx="0" cy="0" r="10" fill="url(#sprite-1)"/>';
    this.bird = this.elm.querySelector("#player");

}

Player.prototype.init = function ()
{
    this.intervalId = setInterval(()=>{
        this.property.spriteId++;
        if (this.property.spriteId === 4)
            this.property.spriteId = 1;
        this.bird.setAttribute("fill", "url(#sprite-"  + this.property.spriteId + ")");
    }, 80);
};

Player.prototype.start = function ()
{
    this.rotation = 0;
    this.property.fallAt = (new Date()).getTime();
    this.property.yFall = this.position.y;
};

Player.prototype.stop = function ()
{
    clearInterval(this.intervalId);
};

Player.prototype.update = function ()
{
    let dt;

    dt = ((new Date()).getTime() - this.property.fallAt) / 100;
    this.rotation = (this.property.g * dt - this.property.v0 / 1.5) * 2.5;
    this.move(this.position.x,
        (this.property.g * dt * dt - this.property.v0 * dt) + this.property.yFall);
};

Player.prototype.move = function (x, y)
{
    this.elm.setAttribute('transform',
        'translate(' + x + ',' + y + '),' + 'rotate(' + this.rotation + ' )');
    this.position = {x: x, y: y};
};

Player.prototype.jump = function ()
{
    this.property.fallAt = (new Date()).getTime();
    this.property.yFall = this.position.y;
};

Player.prototype.getSprites = function ()
{
    return (`
    <defs id="player-sprites">
        <pattern id="sprite-1" x="-10" y="-10" patternUnits="userSpaceOnUse"
             height="512" width="512">
             <image height="512" width="512" x="-114" y="-377"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="sprite-2" x="-10" y="-10" patternUnits="userSpaceOnUse"
             height="512" width="512">
             <image height="512" width="512" x="-114" y="-403"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="sprite-3" x="-10" y="-10" patternUnits="userSpaceOnUse"
             height="512" width="512">
             <image height="512" width="512" x="-114" y="-429"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
    </defs>
    `);
};
