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

Play.prototype.play = function() {
    console.log(this._main);
};