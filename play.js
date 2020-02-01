class Play {

    constructor(main) {

        this._selected = undefined;
        this._playerTurn = 0;
        this._gridSize = 12;
        this._boxSize = 60;
        this._windowWidth = 720;
        this._windowHeight = 720;
        this._initialized = false;
        this._maxUnit = 3;
        this._currentPlayer = 0;
        this._unitPlaced = 0;
        this._currentUnitType = undefined;

        this._main = main;

        this._map = [];
        for (let i = 0; i < this._gridSize; i++) {
            this._map[i] = new Array(this._gridSize);
            for (let j = 0; j < this._gridSize; j++) {
                let square = new Square(i, j);
                if (i === 1 && j === 1) {
                    square.unit = new Tank(i, j, 0);
                }
                if (i === 1 && j === 5) {
                    square.unit = new Dps(i, j, 1);
                }
                this._map[i][j] = square;
            }
        }
        console.log(this._map);
        this._main.addEventListener('click', event => {
            const posX = Math.ceil(event.offsetX / this._boxSize) - 1;
            const posY = Math.ceil(event.offsetY / this._boxSize) - 1;
            if (posY >= 0 && posY < this._map.length
                && posX >= 0 && posX < this._map[posY].length
            ) {
                console.log({
                    posX: posX,
                    posY: posY,
                })
            }
            if (!this._initialized) {
                if (this._currentUnitType === undefined) {
                    return;
                }
                this._unitPlaced++;
                if (this._unitPlaced >= this._maxUnit) {
                    if (this._currentPlayer === 0) {
                        this._unitPlaced = 0;
                        this._currentPlayer = 1;
                    } else {
                        this._initialized = true;
                    }
                }
                return;
            }
            // TODO recuperer la case correspondant à la position
            if (this._selected !== undefined) {
                let square2 = this._map[posX][posY];
                if (square2.unit === undefined) {
                    console.log(this._selected);
                    this.goto(this._selected, square2);
                } else if (square2.unit.player !== this._playerTurn) {
                    this.attack(this._selected, square2);
                }
            } else {
                let square = this._map[posX][posY];
                if (square.unit.player === this._playerTurn) {
                    this._selected = square.unit;
                    console.log(this._selected);
                } else {
                    alert("t'est trop con, c'est pas ton unité");
                }
            }
        });
    }

    play () {
        this._draw();

        const placeDps = document.getElementById("place-dps");
        const placeTank = document.getElementById("place-tank");
        const placeDistance = document.getElementById("place-distance");

        placeDps.addEventListener('click', event => {


        });
    }
}

Play.prototype._draw = function () {
    this._main.width = this._windowWidth;
    this._main.height = this._windowHeight;
    this._main.zIndex = 0;

    for (let i = 0; i < this._map.length; i++) {
        for (let j = 0; j < this._map[i].length; j++) {
            const ctx = this._main.getContext('2d');
            ctx.strokeStyle = "black";
            ctx.strokeRect(i * this._boxSize, j * this._boxSize, this._boxSize, this._boxSize);

            const square = this._map[i][j];
            if (square.unit !== undefined) {
                ctx.fillStyle = square.unit.player === 0 ? 'green' : 'yellow';
                ctx.fillRect(i * this._boxSize, j * this._boxSize, this._boxSize, this._boxSize);
            }
        }
    }
};

Play.prototype.goto = function (unit, square) {
    let startX = unit.posX;
    let startY = unit.posY;
    let endX = square.positionX;
    let endY = square.positionY;
    if (this.distance(endX, endY, startX, startY) <= unit.move) {
        this._map[startX][startY].unit = undefined;
        this._map[endX][endY].unit = unit;
        unit.posX = endX;
        unit.posY = endY;
        this._draw();
        this._selected = undefined;
    } else {

        alert("C'est trop loin !!!");
    }
};

Play.prototype.attack = function (unitCurrentPlayer, square) {
    let unitOpponent = square.unit;
    unitOpponent.life -= unitCurrentPlayer.damage;
    console.log(unitOpponent);
    if (unitOpponent.life <= 0) {
        this.disparition(square);
    }
};

Play.prototype.disparition = function(square) {
    square.unit = undefined;
    this._map[square.positionX][square.positionY].unit = undefined;
    this._draw();
};

Play.prototype.distance = function(targetX, targetY, startX, startY) {

    return Math.abs(targetX - startX) + Math.abs(targetY - startY);
};

