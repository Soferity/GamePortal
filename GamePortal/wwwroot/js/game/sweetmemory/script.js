var symbols = icons(),
    opened = [],
    match = 0,
    moves = 0,
    $deck = $('.deck'),
    $scorePanel = $('#score-panel'),
    $moveNum = $scorePanel.find('.moves'),
    $ratingStars = $scorePanel.find('i'),
    $restart = $scorePanel.find('.restart'),
    $exit = $scorePanel.find('.exit'),
    delay = 800,
    gameCardsQTY = symbols.length / 2,
    rank3stars = gameCardsQTY + 2, //8 + 2 = 10 | 3
    rank2stars = gameCardsQTY + 6, //8 + 6 = 14 | 2
    rank1stars = gameCardsQTY + 10; //8 + 10 = 18 | 1

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

function icons() {
    switch (randomInt(0, 7)) {
        case 1:
            return ['bus', 'bus', 'tree', 'tree', 'ship', 'ship', 'rocket', 'rocket', 'shield', 'shield', 'magic', 'magic', 'truck', 'truck', 'phone', 'phone'];
        case 2:
            return ['heart-o', 'heart-o', 'key', 'key', 'plane', 'plane', 'gift', 'gift', 'fire', 'fire', 'eye', 'eye', 'camera', 'camera', 'print', 'print'];
        case 3:
            return ['snapchat', 'snapchat', 'youtube', 'youtube', 'whatsapp', 'whatsapp', 'facebook', 'facebook', 'twitter', 'twitter', 'instagram', 'instagram', 'tumblr', 'tumblr', 'github', 'github'];
        case 4:
            return ['credit-card', 'credit-card', 'bullhorn', 'bullhorn', 'globe', 'globe', 'chain', 'chain', 'cloud', 'cloud', 'magic', 'magic', 'table', 'table', 'paperclip', 'paperclip'];
        case 5:
            return ['heartbeat', 'heartbeat', 'skyatlas', 'skyatlas', 'leanpub', 'leanpub', 'trash', 'trash', 'calculator', 'calculator', 'wifi', 'wifi', 'newspaper-o', 'newspaper-o', 'braille', 'braille'];
        case 6:
            return ['bluetooth', 'bluetooth', 'gears', 'gears', 'trophy', 'trophy', 'home', 'home', 'signal', 'signal', 'film', 'film', 'glass', 'glass', 'music', 'music'];
        case 7:
            return ['sun-o', 'sun-o', 'flag', 'flag', 'qrcode', 'qrcode', 'shopping-bag', 'shopping-bag', 'font', 'font', 'headphones', 'headphones', 'lock', 'lock', 'play', 'play'];
        case 8:
            return ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        case 9:
            return ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        case 10:
            return ['', '', '', '', '', '', '', '', '', '', '', '', '', '', '', ''];
        default:
            return ['bicycle', 'bicycle', 'leaf', 'leaf', 'cube', 'cube', 'anchor', 'anchor', 'paper-plane-o', 'paper-plane-o', 'bolt', 'bolt', 'bomb', 'bomb', 'diamond', 'diamond'];
    }
}

// Random number
function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Shuffle function From http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Initial Game
function initGame() {
    var cards = shuffle(symbols);
    $deck.empty();
    match = 0;
    moves = 0;
    $moveNum.html(moves);
    $ratingStars.removeClass('fa-star-o').addClass('fa-star');
    for (var i = 0; i < cards.length; i++) {
        $deck.append($('<li class="card"><i class="fa fa-' + cards[i] + '"></i></li>'))
    }
};

// Set Rating and final Score
function setRating(moves) {
    var rating = 3;

    if (moves > rank3stars && moves <= rank2stars) {
        $ratingStars.eq(2).removeClass('fa-star').addClass('fa-star-o');
        rating = 2;
    } else if (moves > rank2stars && moves <= rank1stars) {
        $ratingStars.eq(1).removeClass('fa-star').addClass('fa-star-o');
        rating = 1;
    } else if (moves > rank1stars) {
        $ratingStars.eq(0).removeClass('fa-star').addClass('fa-star-o');
        rating = 0;
    }

    return {
        score: rating
    };
};

// End Game
function endGame(moves, score) {
    swal({
        allowEscapeKey: false,
        allowOutsideClick: false,
        title: winTitle,
        text: String.format(winText, moves, score, '\n'), //winText.format(moves, score, '\n')
        type: 'success',
        background: '#1C2020',
        confirmButtonColor: '#9BCB3C',
        confirmButtonText: winConfirm
    }).then(function(isConfirm) {
        if (isConfirm) {
            symbols = icons();
            initGame();
        }
    })
}

// Restart Game
$restart.on('click', function() {
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
    }).then(function(isConfirm) {
        if (isConfirm) {
            symbols = icons();
            initGame();
        }
    })
});

// Exit Game
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
            Taiizor.Redirect.Location('');
        }
    })
});

// Card flip
$deck.on('click', '.card:not(".match, .open")', function() {
    if ($('.show').length > 1) {
        return true;
    }

    var $this = $(this),
        card = $this.context.innerHTML;
    $this.addClass('open show');
    opened.push(card);

    // Compare with opened card
    if (opened.length > 1) {
        if (card === opened[0]) {
            $deck.find('.open').addClass('match animated infinite rubberBand');
            setTimeout(function() {
                $deck.find('.match').removeClass('open show animated infinite rubberBand');
            }, delay);
            match++;
        } else {
            $deck.find('.open').addClass('notmatch animated infinite wobble');
            setTimeout(function() {
                $deck.find('.open').removeClass('animated infinite wobble');
            }, delay / 1.5);
            setTimeout(function() {
                $deck.find('.open').removeClass('open show notmatch animated infinite wobble');
            }, delay);
        }
        opened = [];
        moves++;
        setRating(moves);
        $moveNum.html(moves);
    }

    // End Game if match all cards
    if (gameCardsQTY === match) {
        setRating(moves);
        var score = setRating(moves).score;
        setTimeout(function() {
            endGame(moves, score);
        }, 500);
    }

    Taiizor.Storage.Local.Set('sweetmemory', 'play');
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

initGame();