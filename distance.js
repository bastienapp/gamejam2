class Distance extends Unit {

    constructor(posX, posY, player) {
        super(posX, posY, player);
        this._move = 2;
        this._damage = 4;
        this._reach = 4;
        this._life = 8;
    }
}