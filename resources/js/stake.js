var stakes = new Array();
var isFormValid = true;

function ContainStakesId(id, type) {
    return false;
}

function BetComplect(number) {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    var Pieces = 0;
    number = parseInt(number);

    // Straight Up
    if (SetBet(number, "SingleElement", bet)) Pieces += 1;

    // Corners and 0 streets
    if (number - 3 >= 1) {
        if (number % 3 != 0) {
            if (SetBet(number - 2, "Corner", 4 * bet)) Pieces += 4;
        }
        if (number % 3 != 1) {
            if (SetBet(number - 3, "Corner", 4 * bet)) Pieces += 4;
        }
    } else {
        switch (number) {
            case 0:
                if (SetBet([0, 3, 2], "Street", 3 * bet)) Pieces += 3;
                if (SetBet([0, 2, 1], "Street", 3 * bet)) Pieces += 3;
                break;
            case 1:
                if (SetBet([0, 2, 1], "Street", 3 * bet)) Pieces += 3;
                break;
            case 2:
                if (SetBet([0, 3, 2], "Street", 3 * bet)) Pieces += 3;
                if (SetBet([0, 2, 1], "Street", 3 * bet)) Pieces += 3;
                break;
            case 3:
                if (SetBet([0, 3, 2], "Street", 3 * bet)) Pieces += 3;
                break;
        }
        if (SetBet([0, 3, 2, 1], "Corner", 4 * bet)) Pieces += 4;
    }
    if (number + 3 <= 36 && number > 0) {
        if (number % 3 != 0) {
            if (SetBet(number + 1, "Corner", 4 * bet)) Pieces += 4;
        }
        if (number % 3 != 1) {
            if (SetBet(number, "Corner", 4 * bet)) Pieces += 4;
        }
    }

    // splits
    if (number % 3 > 0) {
        if (SetBet([number + 1, number], "Split", 2 * bet)) Pieces += 2;
    }
    if (number % 3 != 1 && number != 0) {
        if (SetBet([number, number - 1], "Split", 2 * bet)) Pieces += 2;
    }
    if (number - 3 > 0) {
        if (SetBet([number - 3, number], "Split", 2 * bet)) Pieces += 2;
    } else {
        switch (number) {
            case 0:
                if (SetBet([0, 1], "Split", 2 * bet)) Pieces += 2;
                if (SetBet([0, 2], "Split", 2 * bet)) Pieces += 2;
                if (SetBet([0, 3], "Split", 2 * bet)) Pieces += 2;
                break;
            case 1:
                if (SetBet([0, 1], "Split", 2 * bet)) Pieces += 2;
                break;
            case 2:
                if (SetBet([0, 2], "Split", 2 * bet)) Pieces += 2;
                break;
            case 3:
                if (SetBet([0, 3], "Split", 2 * bet)) Pieces += 2;
                break;
        }
    }
    if (number + 3 <= 36 && number > 0) {
        if (SetBet([number, number + 3], "Split", 2 * bet)) Pieces += 2;
    }

    // streets
    if (number > 0) {
        var firstInStreet = number - number % 3 + ((number % 3) != 0 ? 3 : 0);
        if (SetBet([firstInStreet--, firstInStreet--, firstInStreet], "Street", 3 * bet)) Pieces += 3;
    }

    // Sixline
    if (number - 3 > 0) {
        var leftNumber = number - 3;
        var firstInStreet = leftNumber - leftNumber % 3 + ((leftNumber % 3) != 0 ? 3 : 0);
        if (SetBet(firstInStreet, "Sixline", 6 * bet)) Pieces += 6;
    }
    if (number + 3 <= 36 && number > 0) {
        var firstInStreet = number - number % 3 + ((number % 3) != 0 ? 3 : 0);
        if (SetBet(firstInStreet, "Sixline", 6 * bet)) Pieces += 6;
    }

    RememberCurrentState();
}

function BetNeighbors(element) {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    //eachBet = Math.round(bet / 5 - 0.49);
    eachBet = bet;
    var index = element.data("index");
    var betFrom = index - 2;
    var batTo = index + 2;
    for (var i = betFrom; i <= batTo; i++) {
        index = (37 + i) % 37;
        SetBet(NUMBERS[index], "SingleElement", eachBet);
    }

    RememberCurrentState();
}

function BetJeuZero() {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    //eachBet = Math.round(bet / 4 - 0.49);
    eachBet = bet;
    SetBet([12, 15], "Split", eachBet);
    SetBet([32, 35], "Split", eachBet);
    SetStake2(3, eachBet, "HorizontalWithZeroPair");
    SetBet([26], "SingleElement", eachBet);

    RememberCurrentState();
}

function BetVoisinsduZero() {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    /*eachBet = Math.round(bet / 9 - 0.49);*/
    eachBet = bet;
    SetBet([4, 7], "Split", eachBet);
    SetBet([12, 15], "Split", eachBet);
    SetBet([18, 21], "Split", eachBet);
    SetBet([19, 22], "Split", eachBet);
    SetBet([32, 35], "Split", eachBet);
    SetBet([26, 25, 28, 29], "Corner", 2 * eachBet);
    SetBet([0, 3, 2], "Street", 2 * eachBet);


    RememberCurrentState();
}

function BetOrphelins() {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    /*eachBet = Math.round(bet / 5 - 0.49);*/
    eachBet = bet;
    SetBet([6, 9], "Split", eachBet);
    SetBet([14, 17], "Split", eachBet);
    SetBet([17, 20], "Split", eachBet);
    SetBet([31, 34], "Split", eachBet);
    SetBet([1], "SingleElement", eachBet);


    RememberCurrentState();
}

function BetTiersduCylindre() {
    if (!IsValidConditionForBet()) return false;
    var bet = $(".selected").data("value");
    /*eachBet = Math.round(bet / 6 - 0.49);*/
    eachBet = bet;
    SetBet([5, 8], "Split", eachBet);
    SetBet([11, 10], "Split", eachBet);
    SetBet([13, 16], "Split", eachBet);
    SetBet([24, 23], "Split", eachBet);
    SetBet([27, 30], "Split", eachBet);
    SetBet([33, 36], "Split", eachBet);


    RememberCurrentState();
}

function SetBet(numbers, betType, bet) {

    if (numbers.length == undefined) {
        numbers = [numbers];
    }

    if ($(".selected").length === 0) {
        return false;
    }

    var cell = new Array();

    for (var i = 0; i < numbers.length; i++) {
        $(".round:contains('" + numbers[i] + "')").each(function(idx, val) {
            if ($(val).html() == numbers[i]) {
                cell.push($(val).parents().eq(1));
            }
        });
    }


    var element = $(".selected").clone().removeClass("selected").addClass("onboard");

    switch (bet) {
        case 50:
            element.find('img').attr('src', 'resources/img/green-chip.png');
            break;
        case 100:
            element.find('img').attr('src', 'resources/img/purple-chip.png');
            break;
        case 250:
            element.find('img').attr('src', 'resources/img/blue-chip.png');
            break;
        case 500:
            element.find('img').attr('src', 'resources/img/orange-chip.png');
            break;
        case 1000:
            element.find('img').attr('src', 'resources/img/red-chip.png');
            break;
        default:
            element.find('img').attr('src', 'resources/img/cyan-chip.png');
            break;
    }


    element.find("div.text").html(bet);
    var absHeight;
    var absWidth;
    var type;

    if (betType == "SingleElement" && cell.length == 1) {
        if (!ContainStakesId(numbers[0], "SingleElement")) {
            absTop = (cell[0].outerHeight() - selOutherHeight) / 2;
            absLeft = (cell[0].outerWidth() - selOutherWidth) / 2;
            type = "SingleElement";
        }
    } else if (betType === "Split" && cell.length === 2) {
        if (Math.abs(numbers[0] - numbers[1]) == 1 && numbers[0] != 0) {
            if (!ContainStakesId(numbers[0], "VerticalPair")) {
                absTop = cell[0].outerHeight() - selOutherHeight / 2;
                absLeft = (cell[0].outerWidth() - selOutherWidth) / 2;
                type = "VerticalPair";
            }
        }
        else if (numbers[0] == 0) {
            numbers[0] = numbers[1];
            if (!ContainStakesId(numbers[0], "HorizontalWithZeroPair")) {
                if (numbers[1] == 3) {
                    absTop = -selOutherHeight / 2;
                }
                else if (numbers[1] == 2) {
                    absTop = (cell[0].outerHeight() - selOutherHeight) / 2;
                }
                else {
                    absTop = cell[0].outerHeight() - selOutherHeight / 2; ;
                }
                absLeft = cell[0].outerWidth() - selOutherWidth / 2;
                type = "HorizontalWithZeroPair";
            }
        }
        else {
            if (!ContainStakesId(numbers[0], "HorizontalPair")) {
                absTop = (cell[0].outerHeight() - selOutherHeight) / 2;
                absLeft = cell[0].outerWidth() - selOutherWidth / 2;
                type = "HorizontalPair";
            }
        }
    } else if (betType == "Street" && cell.length == 3) {
        if (numbers[0] == 0) {
            var temp = numbers[1];
            numbers[1] = numbers[0];
            numbers[0] = temp;
            if (!ContainStakesId(numbers[0], "HorizontalWithZeroTrips")) {
                absTop = -selOutherHeight / 2;
                absLeft = -selOutherWidth / 2;
                type = "HorizontalWithZeroTrips";
            }
        }
        else {
            if (!ContainStakesId(numbers[0], "VerticalTrips")) {
                absTop = cell[0].outerHeight() * 2 - selOutherHeight / 2;
                absLeft = (cell[0].outerWidth() - selOutherWidth) / 2;
                type = "VerticalTrips";
            }
        }
    } else if (betType == "Corner"/* && cell.length == 4*/) {
        if (!ContainStakesId(numbers[0], "Quads")) {
            if (numbers[0] != 0) {
                absTop = cell[0].outerHeight() - selOutherHeight / 2;
                absLeft = cell[0].outerWidth() - selOutherWidth / 2;
            } else {
                absTop = cell[1].outerHeight() - selOutherHeight / 2;
                absLeft = - selOutherWidth / 2;
            }
            type = "Quads";
        }
    } else if (betType == "Sixline") {
        if (!ContainStakesId(numbers[0], "TwoVerticalTrips")) {
            absTop = cell[0].outerHeight()*3 - selOutherHeight / 2;
            absLeft = cell[0].outerWidth() - selOutherWidth / 2;
            type = "TwoVerticalTrips";
        }
    }

    if (type !== undefined) {
        element.css({
            "position": "absolute",
            "z-index": 1,
            "top": absTop,
            "left": absLeft
        });

        if (!CheckLimits(numbers[0], type, bet)) return false;

        stakes.push({ Id: numbers[0], Price: bet, Type: type });
        checkSum.val(parseInt(checkSum.val()) + bet);

        if (type == "SingleElement" || type == "HorizontalPair" || type == "VerticalPair" || type == "HorizontalWithZeroPair") {
            cell[0].children(".push-item").eq(0).append(element);
        } else if (type == "HorizontalWithZeroTrips" || type == "VerticalTrips") {
            if (numbers[1] != 0) {
                cell[1].children(".push-item").eq(0).append(element);
            }
            else {
                cell[2].children(".push-item").eq(0).append(element);
            }
        } else if (type == "Quads") {
            if (numbers[0] != 0) {
                cell[0].children(".push-item").eq(0).append(element);
            } else {
                cell[3].children(".push-item").eq(0).append(element);
            }
        } else if (type == "TwoVerticalTrips") {
            cell[0].children(".push-item").eq(0).append(element);
        }

        $(element).data({ Id: numbers[0], Type: type });
        $(element).attr('chip-type', type);
        $(element).attr('split', bet);
        $(element).attr('stake-id', numbers[0]);

        $('.highlighted').removeClass("highlighted");
        return true;
    } else {
        return false;
    }
}

function IsValidConditionForBet() {
    return ($(".selected").length != 0 && currentState == 0 && !$("#cancel-any-button").hasClass("clicked"));
}

function IsComplectBet() {
    return ($("#complect-button").hasClass("clicked") && !$("#cancel-any-button").hasClass("clicked"));
}

function RecalculateChips() {
    this.init = function () {

        var pushItems = $(".push-item");
        var index = 0;
        var total = 0;
        for (var i = 0; i < pushItems.length; i++) {
            try {
                var obj = pushItems[i];
                if (obj === undefined || obj === null) continue;
                var round = $(obj).attr('round');

                var chips = $(obj).find(".chip");
                if (chips.length == 0) continue;

                var chipCount = chips.length;
                var chipTypes = this.getChipTypes(chips);

                for (var chipType in chipTypes) {
                    var count = chipTypes[chipType];

                    var ch = $(obj).find('div.chip[chip-type=' + chipType + ']');

                    var amount = 0;
                    var elem = null;
                    for (var k = 0; k < ch.length; k++) {
                        elem = ch[k];
                        var chipAmount = ch[k].getAttribute('data-value');
                        var amountSplit = ch[k].getAttribute('split');
                        if (amountSplit > 0) chipAmount = amountSplit;
                        total += parseInt(chipAmount);
                        $(elem).find('div.text').html(chipAmount);
                        amount += parseInt($(elem).find('div.text').html());

                    }

                    $(elem).find('div.text').html(amount);
                }

            } catch (e) {
                console.error(e);
            }
        }

        checkSum.val(total);
        $('#check-sum').trigger('updateBalance');
    }

    this.getChipTypes = function (chips) {
        var ret = [];
        for (var i = 0; i < chips.length; i++) {
            if (ret[chips[i].getAttribute('chip-type')] == undefined) {
                ret[chips[i].getAttribute('chip-type')] = 0;
            }
            ++ret[chips[i].getAttribute('chip-type')];
        }
        return ret;
    }
}

function undoLastChip() {

    if (stakes.length == 0) return;
    var lastChip = stakes[stakes.length - 1];
    var id = lastChip.Id;
    $('#td' + id + ' div.chip:last-child').removeStake();
}

function RememberCurrentState() {
    (new RecalculateChips()).init();
    return true;
    $.ajax({
        type: "POST",
        url: '/Stake/RememberCurrentState',
        data: { stakes: JSON.stringify(stakes), currentState: $("#centered-div").html() }
    });
}

$(function () {
    $("#zero").click(function() {
        if (IsComplectBet()) {
            BetComplect(0);
        }
    });

    $('.bet').change(function () {
        if ($(this).val() > 0) {
            $('.selected').find('.text').text($(this).val());
            $('.selected').data("value", $(this).val());
            $(this).css("border-color", "#000000");
            isFormValid = true;
        } else {
            $(this).css("border-color", "#FF0000");
            isFormValid = false;
        }
    });

    $('.push-item .chip').live("click", function () {
        if ($("#cancel-any-button").hasClass("clicked")) {
            $(this).removeStake();
        }
    });

    $('.roulette-chips .chip').live("click", function () {
        if ($("#cancel-any-button").hasClass("clicked")) {
            if ($(this).hasClass("onboard")) {
                $(this).removeStake();
                $(this).remove();
                RememberCurrentState();
            }
        }
        else {
            if (!$(this).hasClass("onboard")) {
                $('.bet').val($(this).find('.text').text());
                $(this).siblings().removeClass("selected");
                if ($(this).hasClass("selected"))
                    $(this).removeClass("selected");
                else
                    $(this).addClass("selected");
            }
        }
    });

    $("#zero").click($.debounce(100, false, function (e) {
        if (!$("#cancel-any-button").hasClass("clicked")) {
            $(this).setStake(e);
        }
    }));


    $(".roulette-board .number, .row-stner div, .rowPorc div").mousedown($.debounce(100, false, function (e) {
        if (!$("#cancel-any-button").hasClass("clicked")) {
         $(this).setStake(e);
         }
    }));



});

var selOutherHeight = 65;//$(".selected").outerHeight();
var selOutherWidth = 65;//$(".selected").outerWidth();

function SetStake2(number, bet, type) {
    if (!CheckLimits(bet)) return false;
    var absHeight, absWidth, absTop, absLeft, selectedChip;
    setOutherSizes();
    var element = $(".roulette-chips  > div[data-value=" + bet + "]").clone().removeClass("selected").addClass("onboard");
    $(".roulette-chips > div").removeClass("selected");
    $(".roulette-chips  > div[data-value=" + bet + "]").removeClass("onboard").addClass("selected");

    selectedChip = $(".roulette-chips  > div[data-value="+ bet + "]");

    switch (parseInt(bet)) {
        case 50:
            element.find('img').attr('src', 'resources/img/green-chip.png');
            break;
        case 100:
            element.find('img').attr('src', 'resources/img/purple-chip.png');
            break;
        case 250:
            element.find('img').attr('src', 'resources/img/blue-chip.png');
            break;
        case 500:
            element.find('img').attr('src', 'resources/img/orange-chip.png');
            break;
        case 1000:
            element.find('img').attr('src', 'resources/img/red-chip.png');
            break;
        case 3000:
            element.find('img').attr('src', 'resources/img/yellow-chip.png');
            break;
        case 5000:
            element.find('img').attr('src', 'resources/img/dark-chip.png');
            break;


        default:
            element.find('img').attr('src', 'resources/img/cyan-chip.png');
            break;
    }

    checkSum.val(parseInt(checkSum.val()) + parseInt(bet));
    stakes.push({ Id: number, Price: bet, Type: type });

    $(element).data({ Id: number, Type: type });
    $(element).attr('chip-type', type);
    $(element).attr('stake-id', number);

    var obj = number == 0 ? $('#zero') : $('#td' + number);

    switch (type) {
        case 'SingleElement':
            // obj = $('.board-container .col-zero');
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });


            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'VerticalPair':
            absTop = $(obj).outerHeight() - selOutherHeight / 2;
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });


            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'HorizontalWithZeroPair':
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;
            absLeft = -selOutherWidth / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'HorizontalPair':
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;
            absLeft = $(obj).outerWidth() - selOutherWidth / 2;
            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'HorizontalWithZeroTrips':
            obj = $('#td' + (number - 1));

            absTop = -selOutherHeight / 2;
            absLeft = -selOutherWidth / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'VerticalTrips':
            obj = $('#td' + (number-2));
            absTop = $(obj).outerHeight() - selOutherHeight / 2;
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'Quads':

            if (number != 0) {
                absTop = $(obj).outerHeight() - selOutherHeight / 2;
                absLeft = $(obj).outerWidth() - selOutherWidth / 2;
            } else {
                absTop = $("#td1").outerHeight() - selOutherHeight / 2;
                absLeft = -selOutherWidth / 2;
            }

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            if (number !== 0) {
                $(obj).children(".push-item").eq(0).append(element);
            } else {
                $('#td1').children(".push-item").eq(0).append(element);
            }

            break;
        case 'TwoVerticalTrips':
            obj = $('#td' + (number - 2));

            absTop = $(obj).outerHeight() - selOutherHeight / 2;
            absLeft = $(obj).outerWidth() - selOutherWidth / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'HorizontalLine':

            obj = $('.board-container .col-inchvorban .rowPorc').eq(3-number).find('div').eq(0);

            // obj = $('.board-container .col-inchvorban .push-item').parent().children('div').eq(12);
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'TwelveElements':
            //debugger;
            console.log(number);
            console.log(bet);
            console.log(type);
            obj = $('.board-container .row-stavkeqi-tesakner .row-stner').eq(0).find('div.esim').eq((parseInt(number) + 9) / 12 - 1);

            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);

            break;
        case 'BlackOrRed':
            obj = $('.board-container .row-stavkeqi-tesakner .row-stner').eq(1).find('div.esim').eq(number == 6 ? 2 : 3);
            //obj = $('.roulette-board .row').eq(4).find('div').eq(number === 6 ? 2 : 3);
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'EighteenElements':


          obj=  $('.board-container .row-stavkeqi-tesakner .row-stner').eq(1).find('div.esim').eq(number == 3 ? 0 : 5);
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        case 'EvenOrOdd':

          obj =  $('.board-container .row-stavkeqi-tesakner .row-stner').eq(1).find('div.esim').eq(number == 6 ? 1 : 4);
            //obj = $('.roulette-board .row').eq(4).find('div').eq(number === 6 ? 1 : 4);
            absLeft = ($(obj).outerWidth() - selOutherWidth) / 2;
            absTop = ($(obj).outerHeight() - selOutherHeight) / 2;

            element.css({
                "position": "absolute",
                "z-index": 1,
                "top": absTop,
                "left": absLeft
            });

            $(obj).children(".push-item").eq(0).append(element);
            break;
        default:
            break;
    };

    RememberCurrentState();
}


function HideInvalidChips() {
    if (limit_MinBetAmount == undefined) limit_MinBetAmount = 0;
    if (limit_MaxBetAmount === 0 || limit_MaxBetAmount == undefined) limit_MaxBetAmount = 999999999;

    $('.roulette-chips .chip').each(function (key, item) {
        if ($(item).attr('data-value') < limit_MinBetAmount) $(item).remove();
    });

    $('.roulette-chips .chip').removeClass('selected');
    $('.roulette-chips .chip').first().addClass('selected');
}

function CheckLimits(id, type, bet) {

    if (limit_Balance == undefined) return true;

    var selectedChip = bet == undefined ? parseInt($('.chip.selected > .text').text()) : bet;

    var coef = 36 / Coefficient[type];
    var summ = getCellAmount(id, type);
    console.log(id + " : type - " + type + " : summ - " + summ + " : coef - " + coef + " / " + Coefficient[type] + " : maxBet : " + (limit_MaxBetAmount * coef));
    if (summ > limit_MaxBetAmount * coef) return false;
    if (summ < limit_MinBetAmount) return false;


    function getCellAmount(id, type) {
        var summ = 0;
        $(stakes).each(function (key, elem) {
            if (elem['Type'] === type && elem['Id'] === id) {
                summ += parseInt(elem['Price']);
            }
        });

        return summ + selectedChip;
    }

    return true;
}

function CheckLimits(amount) {
    return true;
    if ($('#balance')) {
        if (parseInt($('#balance').html()) < amount) {
            $('.error-big').remove();
            $('.roulette-chips').after('<div class="error-big">Недостаточно средств</div>');
            setTimeout(function () { $('.error-big').fadeOut(); }, 3000);
            return false;
        }
    }

    if (parseInt($('#check-sum').val()) + amount > OneRoundTotalBet) {
        $('.error-big').remove();
        if (window.location.pathname == '/play') {
            $('.roulette-chips').after('<div class="error-big">Превышен лимит ставок в одном раунде</div>');
        } else {
            alert('Превышен лимит ставок в одном раунде');
        }
        setTimeout(function () { $('.error-big').fadeOut(); }, 3000);
        return false;
    }

    return true;
}
var checkSum;

function setOutherSizes(){
    var ww = $(document).outerWidth();
    if(ww < 1200) {}
    if(ww < 992) {
        selOutherHeight = 62;
        selOutherWidth  = 62;
    }
    if(ww < 768) {
        selOutherHeight = 44;
        selOutherWidth  = 65;
    }
    if(ww < 576) {
        selOutherHeight = 40;
        selOutherWidth  = 26;
    }

}

function recalcualteChipPositions()
{
    stakes = [];
    checkSum.val(0);
    var chipObj = $('.board-container .push-item > .chip');
  // console.log(chipObj);
  // console.log(chipObj.length);
    for(var i=0;i<chipObj.length;i++){
        var chip = chipObj[i];

        var type = $(chip).attr('chip-type');
        var number = $(chip).attr('stake-id');
        var bet = $(chip).attr('data-value');
        $(chip).remove();


        SetStake2(number, bet, type)
    }
}

$.fn.setStake = function(event) {
     //debugger;
    if(checkSum == undefined) checkSum = $('#check-sum');
    /*if (!IsValidConditionForBet() || $("#complect-button").hasClass("clicked")) {
     return false;
     }*/

    var element = $(".selected").clone().removeClass("selected").addClass("onboard");
    var amount = parseInt($(".selected").attr('data-value'));

    if (!CheckLimits(amount)) return false;

    setOutherSizes();

    var absHeight;
    var absWidth;


    var id = parseInt($(".highlighted").eq(0).find(".round").html());
    var type;


    if ($(".highlighted").length === 1) {
        if (!ContainStakesId(id, "SingleElement")) {
            absTop = ($(this).outerHeight() - selOutherHeight) / 2;
            absLeft = ($(this).outerWidth() - selOutherWidth) / 2;
            type = "SingleElement";
        }
    } else if ($(".highlighted").length == 2) {

        if (Math.abs($(".highlighted").eq(0).find(".round").html() - $(".highlighted").eq(1).find(".round").html()) ==  1
            && $(".highlighted").eq(0).attr("id") != "zero") {
            if (!ContainStakesId(id, "VerticalPair")) {

                absTop = $(".highlighted").eq(0).outerHeight() - selOutherHeight / 2;
                absLeft = ($(".highlighted").eq(0).outerWidth() - selOutherWidth) / 2;
                type = "VerticalPair";

            }
        } else if ($(".highlighted").eq(0).attr("id") == "zero") {

            id = parseInt($(".highlighted").eq(1).find(".round").html());
            if (!ContainStakesId(id, "HorizontalWithZeroPair")) {
                absLeft = $(".highlighted").eq(0).outerWidth() - selOutherWidth / 2;
                if (id == 3) {
                    //absTop = ($(this).outerHeight() - selOutherHeight)/2;
                    absTop = ($(this).outerHeight() - selOutherHeight) / 2;
                    absLeft = -selOutherHeight / 2;
                } else if (id == 2) {
                    //absTop = ($(".highlighted").eq(0).outerHeight() - selOutherHeight) / 2;
                    absTop = ($(this).outerHeight() - selOutherHeight) / 2;
                    absLeft = -selOutherHeight / 2;
                } else {
                    absTop = ($(this).outerHeight() - selOutherHeight) / 2;
                    absLeft = -selOutherHeight / 2;
                }

                type = "HorizontalWithZeroPair";
            }
        } else {
            if (!ContainStakesId(id, "HorizontalPair")) {

                absTop = ($(".highlighted").eq(0).outerHeight() - selOutherHeight) / 2;
                absLeft = $(".highlighted").eq(0).outerWidth() - selOutherWidth / 2;
                type = "HorizontalPair";

            }
        }
    } else if ($(".highlighted").length == 3) {
        if ($(".highlighted").eq(0).attr("id") == "zero") {
            id = parseInt($(".highlighted").eq(1).find(".round").html());
            if (!ContainStakesId(id, "HorizontalWithZeroTrips")) {

                absTop = -selOutherHeight / 2;
                absLeft = -selOutherWidth / 2;
                type = "HorizontalWithZeroTrips";

            }

        } else {
            if (!ContainStakesId(id, "VerticalTrips")) {

                absTop = $(".highlighted").eq(0).outerHeight() - selOutherHeight / 2;
                absLeft = ($(".highlighted").eq(0).outerWidth() - selOutherWidth) / 2;
                type = "VerticalTrips";

            }
        }
    } else if ($(".highlighted").length == 4) {
        if (!ContainStakesId(id, "Quads")) {
            if ($(".highlighted").eq(0).attr("id") != "zero") {
                absTop = $(".highlighted").eq(0).outerHeight() - selOutherHeight / 2;
                absLeft = $(".highlighted").eq(0).outerWidth() - selOutherWidth / 2;
            } else {
                absTop = $(".highlighted").eq(1).outerHeight() - selOutherHeight / 2;
                absLeft = -selOutherWidth / 2;
            }
            type = "Quads";
        }
    } else if ($(".highlighted").length == 6) {
        if (!ContainStakesId(id, "TwoVerticalTrips")) {

            absTop = $(".highlighted").eq(0).outerHeight() - selOutherHeight / 2;
            absLeft = $(".highlighted").eq(0).outerWidth() - selOutherWidth / 2;
            type = "TwoVerticalTrips";

        }
    } else {

        absLeft = ($(this).outerWidth() - selOutherWidth) / 2;
        absTop = ($(this).outerHeight() - selOutherHeight) / 2;

        if ($(".highlighted").length == 12) {
            if (Math.abs($(".highlighted").eq(0).find(".round").html() -
                    $(".highlighted").eq(4).find(".round").html()) ==
                12) {
                if (!ContainStakesId(id, "HorizontalLine")) {
                    type = "HorizontalLine";
                }
            } else {
                if (!ContainStakesId(id, "TwelveElements")) {
                    type = "TwelveElements";

                }
            }
        } else if ($(".highlighted").length == 18) {
            if (!$(".highlighted.black").length || !$(".highlighted.red").length) {
                if (!ContainStakesId(id, "BlackOrRed")) {
                    type = "BlackOrRed";

                }
            } else if (Math.abs($(".highlighted").eq(0).find(".round").html() -
                    $(".highlighted").eq(1).find(".round").html()) ==
                3) {
                if (!ContainStakesId(id, "EighteenElements")) {
                    type = "EighteenElements";

                }
            } else {
                if (!ContainStakesId(id, "EvenOrOdd")) {
                    type = "EvenOrOdd";
                }
            }
        }
    }

    if (type !== undefined) {
        element.css({
            "position": "absolute",
            "z-index": 1,
            "top": absTop,
            "left": absLeft
        });

        if (!CheckLimits(id, type)) return false;

        stakes.push({ Id: id, Price: $(".selected").data("value"), Type: type });
        checkSum.val(parseInt(checkSum.val()) + parseInt($(".selected").data("value")));

        $(element).data({ Id: id, Type: type });
        $(element).attr('chip-type', type);
        $(element).attr('stake-id', id);

        if ($(this).hasClass("number") && $(".highlighted").length == 3) {
            if ($(".highlighted").eq(0).attr("id") != "zero") {
                $(".highlighted").eq(2).children(".push-item").eq(0).append(element);
            } else {
                $(".highlighted").eq(2).children(".push-item").eq(0).append(element);
            }
        } else if ($(this).hasClass("number") && $(".highlighted").length == 4) {
            if ($(".highlighted").eq(0).attr("id") != "zero") {
                $(".highlighted").eq(0).children(".push-item").eq(0).append(element);
            } else {
                $(".highlighted").eq(3).children(".push-item").eq(0).append(element);
            }
        } else if ($(this).hasClass("number") && $(".highlighted").length == 6) {
            $(".highlighted").eq(4).children(".push-item").eq(0).append(element);
        } else {
            if ((id - 3) % 3 === 0 && (type === 'TwoVerticalTrips' || type === 'VerticalTrips')) {
                if (type == 'VerticalTrips') {
                    $('#td' + (id - 2)).children(".push-item").eq(0).append(element);
                } else {
                    $('#td' + (id - 2)).children(".push-item").eq(0).append(element);
                }
            } else if ((id - 2) % 3 == 0 && (type == 'VerticalPair' || type == 'Quads')) {
                $('#td' + id).children(".push-item").eq(0).append(element);
            } else if ((id - 1) % 3 == 0 && (type == 'HorizontalPair' || type == 'HorizontalWithZeroPair')) {
                switch (type) {
                    case 'HorizontalWithZeroPair':
                        $('#td' + id).children(".push-item").eq(0).append(element);
                        break;
                    default:
                        $('#td' + id).children(".push-item").eq(0).append(element);
                }

            } else {
                if ((type === 'SingleElement' ||
                    type === 'HorizontalWithZeroPair' ||
                    type == 'VerticalPair' ||
                    type == 'HorizontalPair') &&
                    id != 0) {
                    $('#td' + id).children(".push-item").eq(0).append(element);
                } else {
                    $(this).children(".push-item").eq(0).append(element);
                }
            }
        }

        var high = $('.highlighted');
        $('.highlighted').removeClass("highlighted");

        RememberCurrentState();

        $(high).addClass("highlighted");
        if (highlightTimeout != null) clearTimeout(highlightTimeout);

        highlightTimeout = setTimeout(function() { ClearHighlight() }, 2000);

    }
};
var highlightTimeout = null;

$.fn.removeStake = function () {
    var id = $(this).data("Id");
    var type = $(this).data("Type");

    checkSum.val(parseInt(checkSum.val()) - parseInt($(this).find('div.text').html()));

    $(this).remove();

    if (type !== undefined) {

        var index = -1;
        for (var i = 0; i < stakes.length; i++) {
            if (stakes[i].Id == id && stakes[i].Type == type) {
                index = i;
            }
        }
        stakes.splice(index, 1);
    }

    RememberCurrentState();

}


