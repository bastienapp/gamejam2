class Unit {

    constructor(_posX,_posY, _player) {
        this._move = 0;
        this._damage = 0;
        this._reach = 0;
        this._life = 0;
        this._posX = _posX;
        this._posY = _posY;
        this.player = _player;
    }

    get move() {
        return this._move;
    }

    set move(value) {
        this._move = value;
    }

    get damage() {
        return this._damage;
    }

    set damage(value) {
        this._damage = value;
    }

    get reach() {
        return this._reach;
    }

    set reach(value) {
        this._reach = value;
    }

    get life() {
        return this._life;
    }

    set life(value) {
        this._life = value;
    }
}