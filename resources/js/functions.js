var rouletteStarted = false;

function main(fromPA) {

    if (fromPA == undefined) fromPA = false;
    setInterval(function() {
            if (rouletteStarted && currentState === 0) {
                rouletteStarted = false;
                $("#board .highlighted").removeClass("highlighted");
                $("#ball").css({ top: 0, left: 0, display: 'none' });

                showRoundNumber(fromPA);

                $.ajax({
                    type: "POST",
                    url: '/Home/GetHistory',
                    success: function(history) {
                        $(".right .selected-number").fadeOut(1000,
                            function() {
                                $(this).remove();
                            });

                        $("#history").html(history);
                        if (fromPA) {
                            checkSum.val("0");
                        }
                        $('.roulette-board div.chip').remove();
                        $('#zero div.chip').remove();

                    }
                });
            }
            if (!rouletteStarted && currentState === 1) {
                if (fromPA) {
                    try {
                        createStack();
                    } catch (e) {
                        //alert(e);
                    }
                }
                rouletteStarted = true;
            }
        },
        1000);
}

function showRoundNumber(fromPA) {
    if (fromPA == undefined) fromPA = false;
    $.ajax({
        type: "POST",
        url: '/Stake/PrevRoundNumber',
        datatype: 'json',
        success: function(json) {
            if (json.nextNumber === null) {
                showRoundNumber();
            } else {
                $('#winAmount').hide();
                if (fromPA) {
                    $.post("/Stake/CheckWinner",
                        { barCode: '978' + contractNumber },
                        function(data) {
                            updatePlayerBalance();
                            if (data.isWinner) {
                                $('#winAmount').show();
                                $('.winAmount2').html(data.price);
                                setTimeout(function () { $('#winAmount').hide(); }, fromPA ? 2000 : 5000);
                            }
                        });
                }

                $('#winNum').html(json.nextNumber);
                $('#winNumberBlock').fadeIn('slow',
                    function() {
                        setTimeout(function () { $('#winNumberBlock').fadeOut('slow') }, fromPA ? 2000 : 5000);
                    });
                if (json.nextNumber == 0) {
                    $('#zero').addClass('activeNumber');
                    setTimeout(function() {
                            $('#zero').removeClass('activeNumber');
                        },
                        6000);
                } else {
                    $('#td' + json.nextNumber).addClass('activeNumber');
                    setTimeout(function() {
                            $('#td' + json.nextNumber).removeClass('activeNumber');
                        },
                        6000);
                }

            }
        }
    });
}

function drawStakes(stakes) {
    if (stakes != "") {
        if ($("#board").html() != stakes)
            $("#board").html(stakes);
    } else {
        $('.roulette-board div.chip').remove();
        $('#zero div.chip').remove();
    }
}


var playerOldW, playerOldH;
var isFullscreen = false;

function checkIsFullScreen() {
    return isFullscreen;
}

function toggleFullScreen(elem) {
    try {
        if (elem == undefined) elem = document.body;
        if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) ||
            (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) ||
            (document.mozFullScreen !== undefined && !document.mozFullScreen) ||
            (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
            if (elem.requestFullScreen) {
                elem.requestFullScreen();
            } else if (elem.mozRequestFullScreen) {
                elem.mozRequestFullScreen();
            } else if (elem.webkitRequestFullScreen) {
                elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen();
            }

            $('header').hide();
            $('#separator').hide();

            $('.videoBlock > div:nth-child(2)').hide();
            $('.videoBlock > div:nth-child(3)').hide();
            $('.videoBlock > div:nth-child(1)').addClass('fullScreen');

            playerOldH = $('#playerElement').height();
            playerOldW = $('#playerElement').width();

            $('#playerElement').width(screen.width);
            $('#playerElement').height(screen.height);

            isFullscreen = true;
        } else {
            if (document.cancelFullScreen) {
                document.cancelFullScreen();
            } else if (document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if (document.webkitCancelFullScreen) {
                document.webkitCancelFullScreen();
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen();
            }

            isFullscreen = false;
            exitHandler();
        }
    } catch (e) {
        alert(e);
    }


}

document.addEventListener('fullscreenchange', exitHandler);
document.addEventListener('webkitfullscreenchange', exitHandler);
document.addEventListener('mozfullscreenchange', exitHandler);
document.addEventListener('MSFullscreenChange', exitHandler);

function exitHandler() {
    if (!document.fullscreenElement &&
        !document.webkitIsFullScreen &&
        !document.mozFullScreen &&
        !document.msFullscreenElement) {
        $('header').show();
        $('#separator').show();

        $('.videoBlock > div:nth-child(2)').show();
        $('.videoBlock > div:nth-child(3)').show();
        $('.videoBlock > div:nth-child(1)').removeClass('fullScreen');

        $('#playerElement').width('100%');
        $('#playerElement').height('800px');

        isFullscreen = false;
    }
}


function getDateString(date) {
    var dd = date.getDate();
    var mm = date.getMonth() + 1; //January is 0!
    var yyyy = date.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    return yyyy + '-' + mm + '-' + dd + 'T00:00:00.000';
}