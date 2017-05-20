/*global XMLNS*/

function UI (width, height)
{
    this.wigth = parseInt(width);
    this.height = parseInt(height);
    this.elm = document.createElementNS(XMLNS, 'g');

    this.elm.setAttribute("id", "ui-container");
    this.elm.innerHTML = this.getInnerHTML();
}

UI.prototype.getInnerHTML = function ()
{
    return (`
        <g id="flappy-bird-text" transform="translate(` + (this.wigth / 2 - 45) + `,
            ` + (this.height / 2 - 80) + `)">
            <rect width="92" height="26" x="0" y="0"
                  fill="url(#flappy-bird-pattern)"></rect>
        </g>
        <g id="tap-ui" transform="translate(` + (this.wigth / 2 - 30) + `,
            ` + (this.height / 1.5 - 42) + `)" style="display: none">
            <rect width="60" height="55" x="0" y="0"
                  fill="url(#tap-pattern)"></rect>
        </g>
        <g id="play-btn" transform="translate(` + (this.wigth / 2 - 30) + `,
            ` + (this.height / 1.5 - 30) + `)" >
            <rect width="60" height="30" x="0" y="0"
                  fill="url(#play-btn-pattern)"></rect>
        </g>
        <g id="game-over-ui" transform="translate(` + (this.wigth / 2 - 50) + `,
            ` + 20 + `)" style="display: none">
            <rect width="100" height="23" x="0" y="0"
                  fill="url(#game-over-pattern)"></rect>
        </g>
        <g id="score-panel-ui" transform="translate(` + (this.wigth / 2 - 60) + `,
            ` + 70 + `)" style="display: none">
            <rect width="118" height="60" x="0" y="0"
                  fill="url(#score-panel-pattern)"></rect>
        </g>
        <text id="score-ui" x="` + (this.wigth / 2 + 44) + `"  y="98" font-size="14px"
              font-family="f" text-anchor="end" style="display: none">0</text>
        <text id="best-score-ui" x="` + (this.wigth / 2 + 44) + `"  y="120"
              font-size="14px" font-family="f" text-anchor="end" style="display: none">0</text>
    `);
};

UI.prototype.getSprites = function ()
{
    return (`
    <defs id="UI-sprites">
        <pattern id="get-ready-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-295" y="-57"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="flappy-bird-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-351" y="-91"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="play-btn-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-351" y="-118"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="tap-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-291" y="-86"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="game-over-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-394" y="-59"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
        <pattern id="score-panel-pattern" x="0" y="0" patternUnits="userSpaceOnUse"
             height="256" width="128">
             <image height="512" width="512" x="-1" y="-258"
                  xlink:href="assets/img/sprites.png"></image>
        </pattern>
    </defs>
    `);
};