class Play {

    constructor(main) {

        this._main = main;

        this._map = [];
        for (let i = 0; i < 9; i++) {
            this._map[i] = new Array(9);
        }
    }
}

Play.prototype.play = function () {

    this._draw();
};

Play.prototype._draw = function () {
    this._main.width = 800;
    this._main.height = 600;
    this._main.zIndex = 0;

    for (let i = 0; i < this._map.length; i++) {
        for (let j = 0; j < this._map[i].length; j++) {
            const ctx = this._main.getContext('2d');
            ctx.fillStyle = (i + j) % 2 === 0 ? 'green' : 'yellow';
            ctx.fillRect(i * 30, j * 30, 30, 30);
        }
    }
};