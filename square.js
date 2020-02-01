class Square {

    constructor(positionX, positionY) {
        this._field = 0;
        this._unitName = 0;
        this._positionX = positionX;
        this._positionY = positionY;
    }

    get field() {
        return this._field;
    }

    set field(value) {
        this._field = value;
    }

    get unitName() {
        return this._unitName;
    }

    set unitName(value) {
        this._unitName = value;
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