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
        this._alreadyMove = false;
        this._alreadyAttack = false;
        this._annuncementCurrentPlayer = document.getElementById("currentPlayer");
        this._annuncementAction = document.getElementById("action");
        this._annuncementUnit = document.getElementById("currentUnit");
        this._main = main;

        this._map = [];
        for (let i = 0; i < this._gridSize; i++) {
            this._map[i] = new Array(this._gridSize);
            for (let j = 0; j < this._gridSize; j++) {
                this._map[i][j] = new Square(i, j);
            }
        }
        this._main.addEventListener('click', event => {
            const posX = Math.ceil(event.offsetX / this._boxSize) - 1;
            const posY = Math.ceil(event.offsetY / this._boxSize) - 1;
            if (posY >= 0 && posY < this._map.length
                && posX >= 0 && posX < this._map[posY].length
            ) {
                let x = event.pageX;
                let y = event.pageY;
                let larg = (this._main.offsetLeft);
                let haut = (this._main.offsetTop);
                console.log({
                    posX: posX,
                    posY: posY,
                    x,
                    y,
                    larg,
                    haut
                })
            } else {
                return;
            }
            if (!this._initialized) {
                if (this._currentUnitType === undefined) {
                    alert("Choisi d'abord un type d'unité !");
                    return;
                }
                let unit = new Dps(posX, posY, this._currentPlayer);
                if (this._currentUnitType === "tank") {
                    unit = new Tank(posX, posY, this._currentPlayer);
                } else if (this._currentUnitType === "distance") {
                    unit = new Distance(posX, posY, this._currentPlayer);
                }
                this._map[posX][posY].unit = unit;
                this._currentUnitType = undefined;
                this._unitPlaced++;
                if (this._unitPlaced >= this._maxUnit) {
                    if (this._currentPlayer === 0) {
                        this._unitPlaced = 0;
                        this._currentPlayer = 1;
                    } else {
                        this._initialized = true;
                    }
                }
                this._draw();
                document.getElementById("current-player").innerHTML = "" + (this._currentPlayer + 1);
                return;
            }
            // TODO recuperer la case correspondant à la position
            if (this._selected !== undefined) {
                let square2 = this._map[posX][posY];
                if (square2.unit === undefined) {
                    this.goto(this._selected, square2);
                    if (!this.checkAttack(this._playerTurn) && this._alreadyMove || this._alreadyAttack && this._alreadyMove) {
                        this.switchPlayerTurn();
                    }
                } else if (square2.unit.player !== this._playerTurn) {
                    this.attack(this._selected, square2);
                    if (this._alreadyAttack && this._alreadyMove) {
                        this.switchPlayerTurn();
                    }
                } else if (square2.unit.player === this._playerTurn) {

                    this._selected = square2.unit;
                    this._annuncementUnit.textContent = "L'unité "+this._selected.name+" du joueur"+this._currentPlayer+" est séléctionnée: " +
                        "deplacement: "+this._selected.move+"; life : "+this._selected.life+"; range : "+this._selected.reach+"; damages : "+this._selected.damage;
                    this._draw();
                }
            } else {
                let square = this._map[posX][posY];
                if (square.unit.player === this._playerTurn) {
                    this._selected = square.unit;
                    this._annuncementUnit.textContent = "L'unité "+this._selected.name+" du joueur"+this._currentPlayer+" est séléctionnée: " +
                        "deplacement: "+this._selected.move+"; life : "+this._selected.life+"; range : "+this._selected.reach+"; damages : "+this._selected.damage;
                    this._annuncementAction.textContent ="";
                    this._draw();
                } else {
                    alert("t'est trop con, c'est pas ton unité");
                }
            }
        });
    }

    play() {
        this._draw();

        const placeDps = document.getElementById("place-dps");
        const placeTank = document.getElementById("place-tank");
        const placeDistance = document.getElementById("place-distance");

        placeDps.addEventListener('click', event => {
            this._currentUnitType = "dps";
        });
        placeTank.addEventListener('click', event => {
            this._currentUnitType = "tank";
        });
        placeDistance.addEventListener('click', event => {
            this._currentUnitType = "distance";
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
                let blueSprite = new Image();
                let redSprite = new Image();
                blueSprite.src = square.unit.blueSprite;
                redSprite.src = square.unit.redSprite;
                console.log(this.findTheSquareX(square),this.findTheSquareY(square));
                square.unit.player === 0 ? ctx.drawImage(redSprite,this.findTheSquareX(square) ,this.findTheSquareY(square) ,80,80) : ctx.drawImage(redSprite,this.findTheSquareX(square) ,this.findTheSquareY(square) ,80,80);
                //ctx.fillRect(i * this._boxSize, j * this._boxSize, this._boxSize, this._boxSize);
            }
        }
    }
};

Play.prototype.goto = function (unit, square) {
    let startX = unit.posX;
    let startY = unit.posY;
    let endX = square.positionX;
    let endY = square.positionY;
    if (this.distance(endX, endY, startX, startY) <= unit.move && !this._alreadyMove) {
        this._map[startX][startY].unit = undefined;
        this._map[endX][endY].unit = unit;
        unit.posX = endX;
        unit.posY = endY;
        this._draw();
        this._selected = undefined;
        this._alreadyMove = true;
    } else if (this._alreadyMove) {

        alert("Vous avez déjà bougé !")

    } else {

        alert("C'est trop loin !!!");
    }
};

Play.prototype.attack = function (unitCurrentPlayer, square) {
    let unitOpponent = square.unit;
    if (this.distance(square.positionX, square.positionY, unitCurrentPlayer.posX, unitCurrentPlayer.posY) <= unitCurrentPlayer.reach) {
        unitOpponent.life -= unitCurrentPlayer.damage;
        this._annuncementAction.textContent = "Il reste " + unitOpponent.life+ " à l'unité";
        this._draw();
        this._alreadyAttack = true;
        if (unitOpponent.life <= 0) {
            this.disparition(square);
            this._annuncementAction.textContent = "L'unité est morte !";
            this._draw();
        }
    } else {
        alert("T'es trop loin pour attaquer cette unité");
    }
};

Play.prototype.disparition = function (square) {
    square.unit = undefined;
    this._map[square.positionX][square.positionY].unit = undefined;
    this._draw();
};

Play.prototype.distance = function (targetX, targetY, startX, startY) {

    return Math.abs(targetX - startX) + Math.abs(targetY - startY);
};

Play.prototype.checkAttack = function (player) {
    for (let i = 0; i < this._gridSize; i++) {
        for (let j = 0; j < this._gridSize; j++) {
            let unit = this._map[i][j].unit;
            if (unit !== undefined && unit.player === player) {
                let possibleAttack = this.checkAttackOneUnit(unit);
                if (possibleAttack) {
                    return true;
                }
            }
        }
    }
    this._annuncementAction.textContent = "Aucune unité à porté d'attaque !";
    this._draw();
    return false;
};

Play.prototype.checkAttackOneUnit = function (unit) {
    let playerPotentialyAttacked = 0;
    if (unit.player === 0) {
        playerPotentialyAttacked = 1;
    }
    //lister les unités de ce jour
    for (let i = 0; i < this._gridSize; i++) {
        for (let j = 0; j < this._gridSize; j++) {
            if (this._map[i][j].unit !== undefined) {
                let unitAttackedPlayer = this._map[i][j].unit;
                if (unitAttackedPlayer.player === playerPotentialyAttacked) {
                    if (this.distance(unit.posX, unit.posY, unitAttackedPlayer.posX, unitAttackedPlayer.posY) <= unit.reach) {
                        return true;
                    }
                }
            }
        }
    }
    return false
};

Play.prototype.switchPlayerTurn = function () {
    if (this._playerTurn === 1) {
        this._playerTurn = 0;
    } else {

        this._playerTurn = 1;
    }
    this._selected = undefined;
    this._alreadyMove = false;
    this._alreadyAttack = false;
    this._annuncementCurrentPlayer.textContent = "Au tour du joueur "+this._playerTurn;
    this._annuncementUnit.textContent = "";
    this._draw();
};

Play.prototype.findTheSquareX = function (square) {

    return (square.positionX*this._boxSize);
};

Play.prototype.findTheSquareY = function (square) {

    return (square.positionY*this._boxSize);
};