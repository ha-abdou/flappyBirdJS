/*global XMLNS, Tube*/
'use strict';

function Tube()
{
    this.elm = {};
    this.tubeUp = {};
    this.tubeDown = {};
    this.position = {x: 0, y:0};
    this.width = 26;
    this.height = 161;
    this.xGape = 80;
    this.y = 0;
    this.gape = 40;
    this.top = this.xGape + this.y - this.gape;
    this.bottom = this.xGape + this.y + this.gape;

    this.elm = document.createElementNS(XMLNS, 'g');
    this.elm.innerHTML = `
    <g class="up"><rect width="26" height="161" fill="url(#tube-up-pattern)"></rect></g>
    <g  class="down"><rect width="26" height="161" fill="url(#tube-down-pattern)"></rect></g>`;
    this.tubeUp = this.elm.querySelector(".up");
    this.tubeDown = this.elm.querySelector(".down");
    this.setGape(this.gape);
    this.move(0, 0);
}

Tube.prototype.move = function (x, y)
{
    this.position = {x, y};
    this.elm.setAttribute('transform', 'translate(' + (x) + ',' + (this.y + y) + ')');
};

Tube.prototype.setGape = function (gape)
{
    this.gape = gape;
    this.tubeDown.setAttribute("transform", 'translate(0,' + (this.xGape + gape) + ')');
    this.tubeUp.setAttribute("transform", 'translate(0,' + (-this.xGape - gape) + ')');
};
