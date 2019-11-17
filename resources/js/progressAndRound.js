var hostUrl = 'http://roulette.beticus.com';
var currentState = 0;
var currentRoundNumber;
var roundSecondInterval = null;
var RoundSeconds = null;
var OneRoundTotalBet = 0;

function setProgressBar() {
    setTimeout(function () {
        var requestStartAt = new Date();
        $.ajax({
            type: "POST",
            url: hostUrl + '/Home/GetCurrentState',
            dataType: 'json',
            success: function (state) {

                if (state == null) {

                } else {
                    $(".oneRoundTotalAmount").html(state.OneRoundTotalAmount);
                    $(".minBetSize").html(state.MinBetAmount);
                    $(".maxBetSize").html(state.MaxBetAmount);
                    $(".balance").html(state.Balance);
                    try {
                        if (typeof state == 'string' && state.length > 1000) {
                            navigator.location.address = '/Account/LogIn?ReturnUrl=%2fHome%2fIndex';
                        }
                    } catch (e) {
                        navigator.location.address = '/Account/LogIn?ReturnUrl=%2fHome%2fIndex';
                    }

                    var requestEndAt = new Date();
                    var requsetTime = requestEndAt - requestStartAt;

                    if (state.RoundCurrentSecond != null && state.RoundCurrentSecond >= 0) {
                        $('#round-time').show();
                        $('#round-time').html(state.RoundCurrentSecond);
                    } else {
                        $('#round-time').hide();
                    }

                    currentState = state.State;
                    OneRoundTotalBet = state.OneRoundTotalBet;

                    try {
                        BoardResize(currentState);
                    } catch (e) {
                    }
                    if (currentState == 1 && !$("#main").hasClass("disabled")) {
                        $("#admin-board").parents("#main").addClass("disabled");
                    }
                    else if (currentState == 0 && $("#main").hasClass("disabled")) {
                        $("#admin-board").parents("#main").removeClass("disabled");
                    }
                }
            }
        });
        setProgressBar();
    }, 1000);
}

function getRoundNumber() {
    $.ajax({
        type: "POST",
        url: hostUrl + '/Home/GetCurrentRound',
        success: function (round) {
            $("#round-number").html(round);

            if (currentRoundNumber != round) {
                currentRoundNumber = round;
                $("#cancel-button").click();
            }
        }
    });
}
