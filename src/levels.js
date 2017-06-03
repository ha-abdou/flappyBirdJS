/*global XMLNS, Tube*/
'use strict';

function Level (width, height)
{
    this.width = parseInt(width);
    this.height = parseInt(height);
    this.elm = document.createElementNS(XMLNS, 'g');
    this.bcgd = {};
    this.gd = {};
    this.lastUpdate = 0;
    this.speed = 10;
    this.intervalId = 0;
    this.tubes = [];
    this.lastTubeId = 0;
    this.headTubeId = 0;
    this.dTubes = 70;
    this.tubesHolder = {};
    this.xTubes = 0;
    this.startPoint = 180;

    this.elm.setAttribute('id', 'level');
    this.elm.innerHTML = `
    <rect width="` + width + `" height="` + height + `"
        fill="url(#background-pattern)"></rect>
    <g id="ground-elm" transform="translate(0, 10)" >
        <rect x="0" y="` + (height - height / 4.5 + 10) + `"
        width="` + width + `"
        height="` + (height / 4.5) + `" fill="url(#ground-pattern)"></rect>
    </g>

    `;
    this.createTubes();
}

Level.prototype.init = function ()
{
    let lastUpdate;
    let dt;

    lastUpdate = (new Date()).getTime();
    this.bcgd = document.getElementById("background-pattern");
    this.gd = document.getElementById("ground-pattern");
    this.intervalId = setInterval(()=>{
        dt = lastUpdate - (new Date()).getTime();
        this.bcgd.setAttribute('x',
            (parseFloat(this.bcgd.getAttribute('x')) + (dt / this.speed / 5)).toString());
        this.gd.setAttribute('x',
            (parseFloat(this.gd.getAttribute('x')) + (dt / this.speed)).toString());
        lastUpdate = (new Date()).getTime();
    }, 1);
};

Level.prototype.start = function ()
{
    this.lastUpdate = (new Date()).getTime();
};

Level.prototype.stop = function ()
{
    clearInterval(this.intervalId);
};

Level.prototype.update = function ()
{
    let dt;
    let dx;

    dt = (new Date()).getTime() - this.lastUpdate;
    if (dt === 0)
        return;
    dx = (dt / this.speed);
    for (let i = this.tubes.length - 1; i >= 0; i--)
    {
        this.tubes[i].move(this.tubes[i].position.x - dx
            , this.tubes[i].position.y);
    }
    if (this.tubes[this.headTubeId].position.x < - 30)
        this.pushLast();

    this.lastUpdate = (new Date()).getTime();
};

Level.prototype.pushLast = function ()
{
    let tmp;

    this.tubes[this.headTubeId].move(
        this.tubes[this.lastTubeId].position.x + 26 + this.dTubes ,
        this.tubes[this.headTubeId].position.y);
    tmp = this.headTubeId;
    this.headTubeId++;
    if (this.headTubeId === this.tubes.length)
        this.headTubeId = 0;
    this.lastTubeId = tmp;
};

Level.prototype.createTubes = function ()
{
    let tubesLength;
    let tmp;

    this.tubesHolder = document.createElementNS(XMLNS, 'g');
    this.tubesHolder.setAttribute('id', 'tubes-holder');
    tubesLength = this.width / this.dTubes;
    this.tubes.push(new Tube());
    this.tubes[0].move(this.width , 0);//todo random y
    this.tubesHolder.appendChild(this.tubes[0].elm);
    for (let i = 1; i < tubesLength; i++)
    {
        let tube;

        tube = new Tube();
        this.tubesHolder.appendChild(tube.elm);
        this.tubes.push(tube);
        tube.move(this.tubes[this.lastTubeId].position.x + 26 + this.dTubes , 0);
        this.lastTubeId = i;
    }
    tmp = this.elm.querySelector("#ground-elm");
    tmp.remove();
    this.elm.appendChild(this.tubesHolder);
    this.elm.appendChild(tmp);
};

Level.prototype.resetTubes = function ()
{

};

Level.prototype.getSprites = function ()
{
    return (`
    <defs id="level-passive-sprites">
        <pattern id="background-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="0" y="0"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="ground-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="168">
             <image height="512" width="512" x="-292" y="210"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="tube-up-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="168">
             <image height="512" width="512" x="-56" y="-323"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="tube-down-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="168">
             <image height="512" width="512" x="-84" y="-323"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
    </defs>
    `);
};
