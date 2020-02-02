class Play {

    constructor(main) {

        this._selected = undefined;
        this._playerTurn = "red";
        this._gridSize = 12;
        this._boxSize = 60;
        this._windowWidth = 720;
        this._windowHeight = 720;
        this._initialized = false;
        this._maxUnit = 3;
        this._currentPlayer = "red";
        this._unitPlacedJ0 = 0;
        this._unitPlacedJ1 = 0;
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
                console.log({
                    posX: posX,
                    posY: posY,
                })
            } else {
                return;
            }
            if (!this._initialized) {
                const typeDecision = document.getElementById("nbrUnit");
                if (this._currentUnitType === undefined && typeDecision.style.display !== "none") {
                    alert("Choisi d'abord un nombre d'unité !");
                    return;
                } else if (this._currentUnitType === undefined) {

                    alert("Choisi d'abord un type d'unité !");
                    return;
                }
                let unit = undefined;
                if (this._currentUnitType === "tank") {
                    unit = new Tank(posX, posY, this._currentPlayer);
                } else if (this._currentUnitType === "distance") {
                    unit = new Distance(posX, posY, this._currentPlayer);
                } else if (this._currentUnitType === "dps") {
                    unit = new Dps(posX, posY, this._currentPlayer);
                }
                this._map[posX][posY].unit = unit;
                this._currentUnitType = undefined;
                if (this._currentPlayer === "red") {
                    this._unitPlacedJ0++;
                    this._currentPlayer = "blue";
                } else {
                    this._unitPlacedJ1++;
                    this._currentPlayer = "red";
                }

                if (this._unitPlacedJ0 >= this._maxUnit && this._unitPlacedJ1 >= this._maxUnit) {

                    this._initialized = true;
                    document.getElementById("divSelectUnitType").style.display = "none";
                    this._annuncementCurrentPlayer.textContent = "Au tour du joueur " + this._playerTurn;
                }
                this._draw();
                document.getElementById("current-player").innerHTML = "" + (this._currentPlayer);
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
                    if (this._alreadyAttack) {
                        alert("Vous avez déjà attaqué !")
                    } else {
                        this.attack(this._selected, square2);
                    }
                    if (this._alreadyAttack && this._alreadyMove) {
                        this.switchPlayerTurn();
                    }
                } else if (square2.unit.player === this._playerTurn) {

                    this._selected = square2.unit;
                    this._annuncementUnit.textContent = "L'unité " + this._selected.name + " du joueur: " + this._playerTurn + " est séléctionnée: " +
                        "deplacement: " + this._selected.move + "; life : " + this._selected.life + "; range : " + this._selected.reach + "; damages : " + this._selected.damage;
                    this._draw();
                }
            } else {
                let square = this._map[posX][posY];
                if (square.unit.player === this._playerTurn) {
                    this._selected = square.unit;
                    this._annuncementUnit.textContent = "L'unité " + this._selected.name + " du joueur: " + this._playerTurn + " est séléctionnée: " +
                        "deplacement: " + this._selected.move + "; life : " + this._selected.life + "; range : " + this._selected.reach + "; damages : " + this._selected.damage;
                    this._annuncementAction.textContent = "";
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
        const Units3 = document.getElementById("3Units");
        const Units4 = document.getElementById("4Units");
        const Units5 = document.getElementById("5Units");
        const unitDecision = document.getElementById("nbrUnit");
        const typeDecision = document.getElementById("divSelectUnitType");
        typeDecision.style.display = "none";

        placeDps.addEventListener('click', event => {
            this._currentUnitType = "dps";
        });
        placeTank.addEventListener('click', event => {
            this._currentUnitType = "tank";
        });
        placeDistance.addEventListener('click', event => {
            this._currentUnitType = "distance";
        });

        Units3.addEventListener('click', event => {
            this._maxUnit = 3;
            unitDecision.style.display = "none";
            typeDecision.style.display = "block";
        });
        Units4.addEventListener('click', event => {
            this._maxUnit = 4;
            unitDecision.style.display = "none";
            typeDecision.style.display = "block";
        });
        Units5.addEventListener('click', event => {
            this._maxUnit = 5;
            unitDecision.style.display = "none";
            typeDecision.style.display = "block";
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
                console.log(this.findTheSquareX(square), this.findTheSquareY(square));
                square.unit.player === "red" ? ctx.drawImage(redSprite, this.findTheSquareX(square), this.findTheSquareY(square), 80, 80) : ctx.drawImage(blueSprite, this.findTheSquareX(square), this.findTheSquareY(square), 80, 80);
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
        this._annuncementUnit.textContent = "";
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
        this._annuncementAction.textContent = "Il reste " + unitOpponent.life + "hp à l'unité du joueur: " + unitOpponent.player;
        this._draw();
        this._alreadyAttack = true;
        this._selected = undefined;
        this._annuncementUnit.textContent = "";
        if (unitOpponent.life <= 0) {
            if (unitOpponent.player === "red") {

                this._unitPlacedJ0--;
            } else {

                this._unitPlacedJ1--;
            }
            this.disparition(square);
            this._annuncementAction.textContent = "L'unité est morte !";
            if (this._unitPlacedJ1 === 0 || this._unitPlacedJ0 === 0) {

                this._annuncementAction.textContent = "Le joueur: " + unitOpponent.player + " n'a plus d'unité en jeu. Le joueur: " + unitCurrentPlayer.player + " GAGNE !";
                this._annuncementAction.style.color = "red";
                this._annuncementAction.style.fontSize = "bolder";
                this._annuncementUnit.textContent = "";
            }
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
    let playerPotentialyAttacked = "red";
    if (unit.player === "red") {
        playerPotentialyAttacked = "blue";
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
    if (this._playerTurn === "blue") {
        this._playerTurn = "red";
    } else {

        this._playerTurn = "blue";
    }
    this._selected = undefined;
    this._alreadyMove = false;
    this._alreadyAttack = false;
    this._annuncementCurrentPlayer.textContent = "Au tour du joueur: " + this._playerTurn;
    this._annuncementUnit.textContent = "";
    this._draw();
};

Play.prototype.findTheSquareX = function (square) {

    return (square.positionX * this._boxSize);
};

Play.prototype.findTheSquareY = function (square) {

    return (square.positionY * this._boxSize);
};