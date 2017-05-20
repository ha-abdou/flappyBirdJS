/*global Game*/
/*exported main*/
'use strict';

function main ()
{
    let game;
    let viewPort;

    viewPort = document.querySelector("#view-port");
    game = new Game('300', '256');
    viewPort.appendChild(game.viewPort);
    game.init();
    //game.start();
}
