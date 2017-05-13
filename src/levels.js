/*global XMLNS*/
'use strict';

function Level (width, height)
{
    this.elm = document.createElementNS(XMLNS, 'g');
    this.bcgd = {};
    this.gd = {};
    this.lastUpdate = 0;
    this.speed = 10;

    this.elm.setAttribute('id', 'level');
    this.elm.innerHTML = `
    <rect width="` + width + `" height="` + height + `"
        fill="url(#background-pattern)"></rect>
    <rect class="ground-elm" x="0" y="` + (height - height / 4.5 + 10) + `"
        width="` + width + `"
        height="` + (height / 4.5) + `" fill="url(#ground-pattern)"></rect>
    `;
}

Level.prototype.init = function ()
{
    this.bcgd = document.getElementById("background-pattern");
    this.gd = document.getElementById("ground-pattern");
    //todo save iId
    setInterval(()=>{
        this.bcgd.setAttribute('x',
            (parseFloat(this.bcgd.getAttribute('x')) - (this.speed / 20)).toString());
        this.gd.setAttribute('x',
            (parseFloat(this.gd.getAttribute('x')) - (this.speed / 10)).toString());
    }, 50);
};

Level.prototype.start = function ()
{
    this.lastUpdate = (new Date()).getTime();
};

Level.prototype.update = function ()
{
    //let dt;

    //dt = this.lastUpdate - (new Date()).getTime();
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
    </defs>
    `);
};
