class Play {

    constructor(main) {

        this._gridSize = 9;
        this._boxSize = 30;

        this._main = main;

        this._map = [];
        for (let i = 0; i < this._gridSize; i++) {
            this._map[i] = new Array( this._gridSize);
            for (let j = 0; j < this._gridSize; j++) {
                let square = new Square(i, j);
                if (i === 3 && j === 2) {
                    square.unit = new Tank(i, j, 0);
                }
                if (i === 1 && j === 5) {
                    square.unit = new Dps(i, j, 1);
                }
                this._map[i][j] = square;
            }
        }

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
            // TODO action
        });
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

function goTo(unit, square) {
    let startX = unit.PosX;
    let startY = unit.PosY;
    let endX = square.positionX;
    let endY = square.positionY;

    let moveX = endX - startX;
    if (moveX > 0) {
        for (i = startX; i <= endX; i++) {
            unit.PosX = i;
            //setInterval(unit.PosX(i), 1000);
        }
    } else {
        for (i = startX; i >= endX; i--) {
            unit.PosX = i;
            //setInterval(unit.PosX(i), 1000);
        }
    }
    //clearInterval(endX === startX)

    let moveY = endY - startY;
    if (moveY > 0) {
        for (i = startY; i <= endY; i++) {
            unit.PosY = i;
            //setInterval(unit.PosY(i), 1000);
        }
    } else {
        for (i = startY; i >= endY; i--) {
            unit.PosY = i;
            //setInterval(unit.PosY(i), 1000);
        }
    }
    //clearInterval(endX === startX)
}

function attack(unitCurrentPlayer, square) {
    unitOpponent = square.unitName;
    unitOpponent.life -= unitCurrentPlayer.damage;
    if(unitOpponent.life<=0){
        this.disparition(square);
    }
}

function disparition(square) {
    square.unitName = null;
}