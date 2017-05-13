/**
 * Created by abdou on 13/05/17.
 */
function Debugger ()
{
    this.elm = document.createElementNS(XMLNS, 'g');
    this.playerHitBox = {};

    this.elm.setAttribute('id', 'debugger-container');
}

Debugger.prototype.init = function (player, level)
{
    let circle;

    this.elm.appendChild(this.createLine(
        player.position.x - player.property.r,
        player.position.x + player.property.r,
        level.elm.querySelector(".ground-elm").getAttribute('y'),
        level.elm.querySelector(".ground-elm").getAttribute('y'),
        'red'
    ));

    circle = document.createElementNS(XMLNS, 'circle');
    circle.setAttribute('cx', player.position.x.toString());
    circle.setAttribute('cy', player.position.y.toString());
    circle.setAttribute('r', (player.property.r - 2).toString());
    circle.setAttribute('style', "stroke:black;stroke-width:1");
    circle.setAttribute('fill', "rgba(0,0,0,0)");
    circle.setAttribute('id', "player-hit-box");
    this.playerHitBox = circle;
    this.elm.appendChild(circle);
};

Debugger.prototype.upDate = function (player, level)
{
    this.playerHitBox.setAttribute('cx', player.position.x.toString());
    this.playerHitBox.setAttribute('cy', player.position.y.toString());
};

Debugger.prototype.createLine = function (x1, x2, y1, y2, color)
{
    let line;

    line = document.createElementNS(XMLNS, 'line');
    line.setAttribute('x1', x1);
    line.setAttribute('x2', x2);
    line.setAttribute('y1', (2 + parseInt(y1)).toString());
    line.setAttribute('y2', (2 + parseInt(y2)).toString());
    line.setAttribute('style', "stroke:" + color+ ";stroke-width:2");
    return (line);
};

Debugger.prototype.createCircle = function (r, cx, cy, color)
{

};

Debugger.prototype.update = function ()
{

};
