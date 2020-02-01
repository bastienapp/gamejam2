class Dps extends Unit {

    constructor(posX, posY, player) {
        super(posX, posY, player);
        this._move = 3;
        this._damage = 4;
        this._reach = 2;
        this._life = 12;
    }
}