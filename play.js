class Play {

    constructor(main) {

        this._boxSize = 30;

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
            ctx.fillRect(i * this._boxSize, j * this._boxSize, this._boxSize, this._boxSize);
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
};

function goTo(unit, square) {
    let startX = unit.getPosX();
    let startY = unit.getPosY();
    let endX = square.getPositionX();
    let endY = square.getPositionY();

    let moveX = endX - startX;
    if (moveX > 0) {
        for (i = startX; i <= endX; i++) {
            unit.setPosX(i)
            //setInterval(unit.setPosX(i), 1000);
        }
    } else {
        for (i = startX; i >= endX; i--) {
            unit.setPosX(i)
            //setInterval(unit.setPosX(i), 1000);
        }
    }
    //clearInterval(endX === startX)

    let moveY = endY - startY;
    if (moveY > 0) {
        for (i = startY; i <= endY; i++) {
            unit.setPosY(i)
            //setInterval(unit.setPosY(i), 1000);
        }
    } else {
        for (i = startY; i >= endY; i--) {
            unit.setPosY(i)
            //setInterval(unit.setPosY(i), 1000);
        }
    }
    //clearInterval(endX === startX)
}