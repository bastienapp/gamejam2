class Play {

    constructor(main) {

        this._main = main;

        let map = [
            "      ",
            "      ",
            "      ",
            "      ",
            "      ",
            "      "
        ];

    }
}

Play.prototype.play = function () {
    console.log(this._main);
};

goTo(unit, square)
{
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
