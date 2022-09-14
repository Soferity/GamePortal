/**
 * TODO:
 * - Style win/lose, move out of "alert"
 * - Add in previous high score via localstorage
 * - Update footer
 */
/*
 * Dependencies:
 * Lodash, jQuery, hammerjs
 */
function gameStart() {
    window.game = new Game(4);
    window.game.initialize();
    SetLocalStorage('classic2048', 'play');
}
/*$(document).ready(gameStart);*/

/*
 * Game Board
 */
function Game(size) {
    this.rows = size;
    this.columns = size;
    // board is set as 2d array, with grid cell object for each position
    this.board = [];
    this.boardFlatten = function() {
        return _.flatten(this.board);
    };
    //
    // score setup
    this.score = 0;
    $('[data-js="score"]').html(this.score.toString());
    //
    // flag to check whether any tile movement is in progress;
    this.moveInProgress = false;
    //
}

/**
 * Run all initializations
 */
Game.prototype.initialize = function() {
    // clear any previous grid; per jQuery docs, empty also removes event listeners
    $(".grid").empty();
    $(".tile-container").empty();
    //
    // run new setup
    this.initBoard();
    this.initTile();
    this.initEventListeners();
    //
};
/**/

/**
 * Initialize grid
 */
Game.prototype.initBoard = function() {
    // return grid cell object
    function initGridCell(x, y) {
            var getGridCell = $.parseHTML($("#template_grid_cell").html());
            $(getGridCell).appendTo(".grid");
            return {
                x: x,
                y: y,
                tilesArray: []
            };

        }
        //
        // create 2d array and push grid cell object
    for (var x = 0; x < this.rows; x++) {
        var newArray = [];
        this.board.push(newArray);
        for (var y = 0; y < this.columns; y++) {
            var gridObj = initGridCell(x, y);
            var rowCell = this.board[x];
            rowCell.push(gridObj);
        }
    }
    //
};

/**
 * Initialize tiles
 */
Game.prototype.initTile = function() {
    // isGameOver determines whether the game is finished; needs to be run: before and after creating tile
    this.isGameOver();
    //
    var emptyCell = this.getRandomEmptyCell();
    var tile = new Tile(emptyCell.x, emptyCell.y, game);
    // isGameOver determines whether the game is finished; needs to be run: before and after creating tile
    this.isGameOver();
    //
};
/**/

/**
 * Set event listeners
 */
Game.prototype.initEventListeners = function() {
    var self = this;
    var getGameboard = document.getElementById("touchGameboard");

    /*
           Touch events with Hammerjs
       */
    window.hammertime && window.hammertime.destroy();
    window.hammertime = new Hammer(getGameboard, {
        recognizers: [
            [Hammer.Swipe, {
                direction: Hammer.DIRECTION_ALL
            }]
        ]
    });

    window.hammertime.
    on("swipeleft", function(ev) {
        self.move("left");
    }).
    on("swiperight", function(ev) {
        self.move("right");
    }).
    on("swipedown", function(ev) {
        self.move("down");
    }).
    on("swipeup", function(ev) {
        self.move("up");
    });
    /**/

    /*
           NOTE: Remove event listeners before applying new listeners,
           because this initialization runs each time a new game is created
       */
    // keypress events for up, down, left, right
    $(document).
    off("keydown.move").
    on("keydown.move", function(event) {
        event.preventDefault();
        switch (event.which) {
            // left
            case 37:
                self.move("left");
                break;
                // up
            case 38:
                self.move("up");
                break;
                // right
            case 39:
                self.move("right");
                break;
                // down
            case 40:
                self.move("down");
                break;
        }

    });
    //
    // New game click handler
    $('[data-js="newGame"]').
    off("click.newGame").
    on("click.newGame", window.gameStart);
    //
};
/**/

/**
 * Game is WON!
 */
Game.prototype.gameWon = function() {
    alert("you won");
};
/**/

/**
 * Game is LOST!
 */
Game.prototype.gameLost = function() {
    alert("what a loser!");
};
/**/

/**
 * Check if game over
 */
Game.prototype.isGameOver = function() {
    var gameBoard = this.boardFlatten();

    var is2048 = false;
    var canAnyTileMove = false;
    var hasEmptyCells = false;

    // check if 2048
    gameBoard.forEach(function(val, index, array) {
        val.tilesArray.forEach(function(val, index, array) {
            if (val.valueProp === 2048) {
                is2048 = true;
            }
        });
    });
    // check if there are empty cells
    if (this.getEmptyCells().length > 0) {
        hasEmptyCells = true;
    }
    // Check if move possible
    gameBoard.forEach(function(val, index, array) {
        val.tilesArray.forEach(function(val, index, array) {
            val.moveCheck();
            if (val.canMove === true) {
                canAnyTileMove = true;
            }
        });
    });

    // if game won
    if (is2048) {
        this.gameWon();
        return true;
    } else if (!hasEmptyCells && !canAnyTileMove) {
        // if no empty cells || no tile can move, the game is lost
        this.gameLost();
        return true;
    } else {
        // if there is an empty || a tile can move, return false for isGameOver
        return false;
    }
    //
};

/**
 * Get empty cells
 */
Game.prototype.getEmptyCells = function() {
    var emptyCells = _.filter(this.boardFlatten(), function(val) {
        return !val.tilesArray.length;
    });
    return emptyCells;
};
/**/

/**
 * Return random empty cell for new tile creation
 */
Game.prototype.getRandomEmptyCell = function() {
    var emptyGridCells = this.getEmptyCells();
    var randomIndex = Math.floor(
        Math.random() * Math.floor(emptyGridCells.length));


    return emptyGridCells[randomIndex];
};
/**/

/**
 * Merge tiles
 */
Game.prototype.TileMerge = function() {
    var gameBoard = this.boardFlatten();
    var newScore = this.score;

    // loop through all tiles
    gameBoard.forEach(function(val, index, array) {
        if (val.tilesArray.length === 2) {
            // get current value of 1st tile
            var currentValue = val.tilesArray[0].valueProp;
            // update value
            val.tilesArray[0].value = currentValue * 2;
            // remove 2nd tile
            var x = val.tilesArray.pop();
            x.el.remove();
            // update score
            newScore += currentValue;
        }
    });
    // update game score at the end
    this.score = newScore;
    $('[data-js="score"]').html(this.score.toString());
};
/**/

/**
 * Move animations
 */
Game.prototype.moveAnimations = function(gameBoard) {
    var self = this;
    var promiseArray = [];

    if (this.moveInProgress) {
        return false;
    }

    this.moveInProgress = true;
    gameBoard.forEach(function(val, index, array) {
        val.tilesArray.forEach(function(val, index, array) {
            promiseArray.push(val.animatePosition());
        });
    });

    $.when.apply($, promiseArray).then(function() {
        self.moveInProgress = false;
        self.TileMerge();
        self.initTile();
    });
    if (promiseArray.length === 0) {
        self.moveInProgress = false;
        self.TileMerge();
        self.initTile();
    }
};
/**/

/**
 * Move logic
 */
Game.prototype.move = function(getDirection) {
    var gameBoard;
    // direction passed as argument
    var direction = getDirection.toLowerCase();
    //
    // flag to check whether any
    var hasAnyTileMoved = false;
    //
    if (this.moveInProgress) {
        return false;
    }

    // if UP:
    if (direction === "up") {
        gameBoard = _.orderBy(this.boardFlatten(), "y", "asc");
    } else if (direction === "right") {
        // if RIGHT:
        gameBoard = _.orderBy(this.boardFlatten(), "x", "desc");
    } else if (direction === "down") {
        // if DOWN
        gameBoard = _.orderBy(this.boardFlatten(), "y", "desc");
    } else if (direction === "left") {
        // if LEFT
        gameBoard = _.orderBy(this.boardFlatten(), "y", "asc");
    }

    // loop through all tiles and run tile move foreach
    //
    gameBoard.forEach(function(val, index, array) {
        val.tilesArray.length ?
            val.tilesArray.forEach(function(val) {
                if (val.move(direction, true)) {
                    hasAnyTileMoved = true;
                    val.move(direction);
                }
            }) :
            false;
    });
    //
    // run animation logic at the end
    hasAnyTileMoved ? this.moveAnimations(gameBoard) : false;
};
/**/

/*
 * Tile
 */
function Tile(x, y, game) {
    this.game = game;

    // jQuery element
    this.el;
    // current position
    this.x = x;
    this.y = y;
    // Getter/Setter for value; updates html on set; defaulted to 2 on creation
    this.valueProp = 2;
    Object.defineProperties(this, {
        value: {
            get: function() {
                return this.valueProp;
            },
            set: function(val) {
                this.valueProp = val;
                this.el.
                find(".tile_number").
                html(this.valueProp).
                attr("data-value", val);
            }
        }
    });


    // can move flag
    this.canMove = false;
    // initialize
    this.initialize();
}

/**
 * Initialize
 */
Tile.prototype.initialize = function() {
    // Get html from template and set number text
    var getTile = $.parseHTML($("#template_tile").html());
    this.el = $(getTile);
    this.el.
    find(".tile_number").
    html(this.valueProp).
    attr("data-value", 2);
    // Set position and append to page; initializeFlag is set to True to remove animation and append immediately in correct position
    this.setPosition(this.x, this.y);
    this.animatePosition(true);
    this.el.appendTo(".tile-container");
};
/**/

/**
 * Set new position
 */
Tile.prototype.setPosition = function(getX, getY) {
    this.x = getX;
    this.y = getY;
    this.game.board[getX][getY].tilesArray.push(this);
};
/**/

/**
 * Remove old position
 */
Tile.prototype.removeOldPosition = function(getX, getY) {
    this.game.board[getX][getY].tilesArray.pop();
};
/**/

/**
 * Animate to position
 */
Tile.prototype.animatePosition = function(initalizeFlag) {
    var self = this;
    var fromLeft = this.x * (100 / this.game.rows);
    var fromTop = this.y * (100 / this.game.columns);
    // Initialize flag sets animationDuration to 0 to append immediately in correct position
    var animationDuration = 175;
    var getPromise = $.Deferred();

    if (initalizeFlag) {
        this.el.addClass("initialize");
    } else {
        this.el.removeClass("initialize");
    }

    function resolvePromise() {
        getPromise.resolve();
        self.el.removeClass("animate");
        self.el.removeClass("initialize");
    }

    function setPosition() {
        self.el.addClass("animate");
        self.el.attr({
            "data-x": fromLeft,
            "data-y": fromTop
        });

    }
    if (initalizeFlag) {
        setPosition();
        window.setTimeout(resolvePromise, animationDuration + 50);
    } else {
        setPosition();
        window.setTimeout(resolvePromise, animationDuration);
    }
    return getPromise;
};
/**/

/**
 * Check if move is possible
 */
Tile.prototype.moveCheck = function() {
    // run all checks; return true if any moves are possible
    if (
        this.move("up", true) ||
        this.move("right", true) ||
        this.move("down", true) ||
        this.move("left", true)) {
        this.canMove = true;
        return true;
    } else {
        this.canMove = false;
        return false;
    }
};
/**/

/**
 * Move logic
 */
Tile.prototype.move = function(getDirection, checkFlag) {
    var checkFlag = checkFlag ? true : false;
    var direction = getDirection.toLowerCase();
    var getX = this.x;
    var getY = this.y;

    var getNext;
    var isNextMatch;
    var isNextEmpty;
    var nextPositionArray = [];

    // if UP: check next position
    if (direction === "up") {
        getNext = this.y > 0 ? this.game.board[this.x][this.y - 1] : false;
        nextPositionArray.push(this.x, this.y - 1);
    } else if (direction === "right") {
        // if RIGHT: check next position
        getNext = this.x < 3 ? this.game.board[this.x + 1][this.y] : false;
        nextPositionArray.push(this.x + 1, this.y);
    } else if (direction === "down") {
        // if DOWN: check next position
        getNext = this.y < 3 ? this.game.board[this.x][this.y + 1] : false;
        nextPositionArray.push(this.x, this.y + 1);
    } else if (direction === "left") {
        // if LEFT: check next position
        getNext = this.x > 0 ? this.game.board[this.x - 1][this.y] : false;
        nextPositionArray.push(this.x - 1, this.y);
    }
    // Check if next position contains match or is empty
    isNextMatch =
        getNext &&
        getNext.tilesArray.length === 1 &&
        getNext.tilesArray[0].valueProp === this.valueProp;
    isNextEmpty = getNext && getNext.tilesArray.length === 0;
    //

    // "check only" mode; only to check if tile can move
    if (checkFlag) {
        return isNextEmpty || isNextMatch ? true : false;
    } else if (isNextEmpty || isNextMatch) {
        // not "check only" mode; will actually run move logic
        this.setPosition(nextPositionArray[0], nextPositionArray[1]);
        this.removeOldPosition(getX, getY);
        // do NOT continue to move if a tile has matched - and therefore MERGED into adjoining tile
        if (!isNextMatch) {
            this.move(direction);
        }
    }
};
/**/