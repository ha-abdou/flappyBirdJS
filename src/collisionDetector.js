/*global */
'use strict';

function CollisionDetector(player, tubes)
{
    this.player = player;
    this.tubes  = tubes;
    this.nextId = 0;
}
//get next tube
CollisionDetector.prototype.init = function ()
{
    this.getNext();
};

CollisionDetector.prototype.getNext = function ()
{
    for (let i = this.tubes.length - 1; i >= 0; i--)
    {
        if (this.tubes[i].position.x > this.player.position.x
            &&
            this.tubes[i].position.x < this.tubes[this.nextId].position.x
        )
            this.nextId = i;
    }
    //
};

//check collision
CollisionDetector.prototype.update = function ()
{
    let pos;

    pos = this.player.position;
    //case of ground
    if (pos.y > 214)
        return (-1);

    //case vertical check
    if (this.tubes[this.nextId].position.x < pos.x + this.player.property.r / 2
        &&
        (//case in tubes
            pos.y - this.player.property.r / 2 < this.tubes[this.nextId].top + this.tubes[this.nextId].position.y
            ||
            pos.y + this.player.property.r / 2 > this.tubes[this.nextId].bottom + this.tubes[this.nextId].position.y
        )

    )
        return (-1);
    if (this.tubes[this.nextId].position.x + this.tubes[this.nextId].width < pos.x - this.player.property.r / 2)
    {
        this.nextId++;
        if (this.nextId === this.tubes.length)
            this.nextId = 0;
        return (1);
    }
};

