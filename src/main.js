'use strict';
/*
function play(){
    if(viewPort !== undefined){
        delete viewPort;
    }

    var viewPort = new ViewPort(document.querySelector("#view-port"),600,550);

    viewPort.start = function(){

        this.newPlayer({
            color: 'red',
            character: 1,
            startAt: 'center',//todo
            keyCode: '27'
        });

        this.loadLevel('main');
    };

    viewPort.runTheGame();

    //todo update auto
    document.getElementById('update-game-setting').onclick = function () {
        var setting = {};
        setting.v0 = parseInt(document.getElementById('v0').value || 5000);
        setting.g = parseFloat(document.getElementById('g').value || 10);
        setting.Distence = parseInt(document.getElementById('Distence').value || 100);
        setting.Width = parseInt(document.getElementById('Width').value || 50);
        setting.speed = parseFloat(document.getElementById('speed').value || 1.9);

        viewPort.updateSetting(setting);

    }
}
play();
*/


function main ()
{
    let game;
    let viewPort;

    viewPort = document.querySelector("#view-port");
    game = new Game('180', '256');
    viewPort.appendChild(game.viewPort);
    game.init();
    game.start();
}

/*
 <svg id="view-port" width="600" height="550" style="background: #4db1bb " >
 <line id="p2" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(255,0,0)" />
 <line id="p" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(255,0,0)" />
 <line id="o2" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,255)" />
 <line id="o" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,0,255)" />
 <line id="u2" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,255,255)" />
 <line id="u" x1="0" y1="0" x2="0" y2="0" style="stroke:rgb(0,255,255)" />

 <!-- SVG syntax -->
 <linearGradient id="g-1" gradientUnits="userSpaceOnUse" x1="0%" y1="50%" x2="80.56274654832347%" y2="50%">
 <stop stop-color="#62AD00" offset="0"/>
 <stop stop-color="#CBFA8E" offset="0.05"/>
 <stop stop-color="#62AD00" offset="0.1"/>
 </linearGradient>

 <linearGradient id="g-2" gradientUnits="userSpaceOnUse" x1="0%" y1="50%" x2="80.56274654832347%" y2="50%">
 <stop stop-color="#62AD00" offset="0"/>
 <stop stop-color="#CBFA8E" offset="0.02"/>
 <stop stop-color="#62AD00" offset="0.1"/>
 </linearGradient>

 <defs>
 <pattern id="ground" x="10" y="10" width="30" height="30" patternUnits="userSpaceOnUse">
 <rect height="45" width="40" fill="#9ce659"></rect>
 <circle cx="15" cy="25" r="15" fill="#73bf2e" />
 </pattern>
 </defs>

 <text id="tap" x="-1000" y="100" font-size="55">tap to play</text>
 <text id="score" x="-1000" y="150" font-size="55">0</text>


 </svg>
 */


