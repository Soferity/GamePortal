// Variables
var holding = [],
    moves,
    disksNum = randomInt(3, 8), //3 4 5 6 7 8
    minMoves = movesCalc(disksNum), //7 15 31 63 127 255 
    $canves = $('#canves'),
    $restart = $canves.find('.restart'),
    $exit = $canves.find('.exit'),
    $tower = $canves.find('.tower'),
    $scorePanel = $canves.find('#score-panel'),
    $movesCount = $scorePanel.find('#moves-num'),
    $ratingStars = $scorePanel.find('i'),
    rating = 3;

var winTitle,
    winText,
    winConfirm,

    restartTitle,
    restartText,
    restartConfirm,
    restartCancel,

    exitTitle,
    exitText,
    exitConfirm,
    exitCancel;

function movesCalc(disks) {
    switch (disks) {
        case 4:
            return 15;
        case 5:
            return 31;
        case 6:
            return 63;
        case 7:
            return 127;
        case 8:
            return 255;
        case 9:
            return 511;
        default:
            return 7;
    }
}

// Random number
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Set Rating and final Score
function setRating(moves) {
    if (moves === movesCalc(disksNum)) { //X == 7 | X == 255
        $ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
        rating = 2;
    } else if (moves >= (movesCalc(disksNum) + disksNum) && moves <= (movesCalc(disksNum + 1) - 1)) { //X => 10 AND X <= 14 | X => 263 AND X <= 510
        $ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    } else if (moves >= movesCalc(disksNum + 1)) { //X => 15 | X => 511
        $ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
        rating = 0;
    }
    return {
        score: rating
    };
};

// Init Game
function initGame(tower) {
    $tower.html('');
    rating = 3;
    moves = 0;
    $movesCount.html(0);
    holding = [];
    disksNum = randomInt(3, 8);
    minMoves = movesCalc(disksNum);
    for (var i = 1; i <= disksNum; i++) {
        tower.prepend($('<li class="disk disk-' + i + '" data-value="' + i + '"></li>'));
    }
    $ratingStars.each(function () {
        $(this).removeClass('fa-star-o').addClass('fa-star');
    });
}

// Game Logic
function countMove() {
    moves++;
    $movesCount.html(moves);

    if (moves > minMoves - 1) {
        if ($tower.eq(1).children().length === disksNum || $tower.eq(2).children().length === disksNum) {
            swal({
                allowEscapeKey: false,
                allowOutsideClick: false,
                title: winTitle,
                text: String.format(winText, moves, rating, '\n'), //winText.format(moves, rating, '\n')
                type: 'success',
                background: '#1C2020',
                confirmButtonColor: '#9BCB3C',
                confirmButtonText: winConfirm
            }).then(function (isConfirm) {
                if (isConfirm) {
                    initGame($tower.eq(0));
                }
            })
        }
    }

    setRating(moves);
}

function tower(tower) {
    var $disks = tower.children(),
        $topDisk = tower.find(':last-child'),
        topDiskValue = $topDisk.data('value'),
        $holdingDisk = $canves.find('.hold');

    if ($holdingDisk.length !== 0) {
        if (topDiskValue === holding[0]) {
            $holdingDisk.removeClass('hold');
        } else if (topDiskValue === undefined || topDiskValue > holding[0]) {
            $holdingDisk.remove();
            tower.append($('<li class="disk disk-' + holding[0] + '" data-value="' + holding[0] + '"></li>'));
            countMove();

            Taiizor.SetLocalStorage('towerofhanoi', 'play');
        }
    } else if ($topDisk.length !== 0) {
        $topDisk.addClass('hold');
        holding[0] = topDiskValue;
    }
}

// Event Handlers
$canves.on('click', '.tower', function () {
    var $this = $(this);
    tower($this);
});

$restart.on('click', function () {
    swal({
        allowEscapeKey: true,
        allowOutsideClick: true,
        title: restartTitle,
        text: restartText,
        type: 'warning',
        showCancelButton: true,
        cancelButtonText: restartCancel,
        confirmButtonColor: '#9BCB3C',
        background: '#1C2020',
        cancelButtonColor: '#EE0E51',
        confirmButtonText: restartConfirm
    }).then(function (isConfirm) {
        if (isConfirm) {
            initGame($tower.eq(0));
        }
    })
});

$exit.on('click', function () {
    swal({
        allowEscapeKey: true,
        allowOutsideClick: true,
        title: exitTitle,
        text: exitText,
        type: 'error',
        showCancelButton: true,
        cancelButtonText: exitCancel,
        confirmButtonColor: '#9BCB3C',
        background: '#1C2020',
        cancelButtonColor: '#EE0E51',
        confirmButtonText: exitConfirm
    }).then(function (isConfirm) {
        if (isConfirm) {
            Taiizor.GoLocation('');
        }
    })
});

function SetLocalization(WinTitle, WinText, WinConfirm, RestartTitle, RestartText, RestartConfirm, RestartCancel, ExitTitle, ExitText, ExitConfirm, ExitCancel) {
    winTitle = WinTitle;
    winText = WinText;
    winConfirm = WinConfirm;

    restartTitle = RestartTitle;
    restartText = RestartText;
    restartConfirm = RestartConfirm;
    restartCancel = RestartCancel;

    exitTitle = ExitTitle;
    exitText = ExitText;
    exitConfirm = ExitConfirm;
    exitCancel = ExitCancel;
}

initGame($tower.eq(0));