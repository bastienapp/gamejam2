class Tank extends Unit {

    constructor(posX, posY, player) {
        super(posX, posY, player);
        this._move = 1;
        this._damage = 4;
        this._reach = 2;
        this._life = 12;
        this._name = "Tank";
        this._posX = posX;
        this._posY = posY;
        this._player = player;
        this._redSprite = "image/RedTank.png";
        this._blueSprite = "image/BlueTank.png";
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

    set name(value) {
        this._name = value;
    }

    get redSprite() {
        return this._redSprite;
    }

    set redSprite(value) {
        this._redSprite = value;
    }

    get blueSprite() {
        return this._blueSprite;
    }

    set blueSprite(value) {
        this._blueSprite = value;
    }
}