class Square {

    constructor(positionX, positionY) {
        this._field = undefined;
        this._unit = undefined;
        this._positionX = positionX;
        this._positionY = positionY;
    }

    get field() {
        return this._field;
    }

    set field(value) {
        this._field = value;
    }

    get unit() {
        return this._unit;
    }

    set unit(value) {
        this._unit = value;
    }

    get positionX() {
        return this._positionX;
    }

    set positionX(value) {
        this._positionX = value;
    }

    get positionY() {
        return this._positionY;
    }

    set positionY(value) {
        this._positionY = value;
    }
}