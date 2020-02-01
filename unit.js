class Unit {

    constructor(posX, posY, player) {
        this._move = 0;
        this._damage = 0;
        this._reach = 0;
        this._life = 0;
        this._posX = posX;
        this._posY = posY;
        this._player = player;
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

    get posX() {
        return this._posX;
    }

    set posX(value) {
        this._posX = value;
    }

    get posY() {
        return this._posY;
    }

    set posY(value) {
        this._posY = value;
    }


    get player() {
        return this._player;
    }

    set player(value) {
        this._player = value;
    }
}