class Distance extends Unit {

    constructor(posX, posY, player) {
        super(posX, posY, player);
        this._move = 2;
        this._damage = 4;
        this._reach = 4;
        this._life = 8;
        this._name = "Distance";
        this._posX = posX;
        this._posY = posY;
        this._player = player;
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

    get name() {
        return this._name;
    }
}