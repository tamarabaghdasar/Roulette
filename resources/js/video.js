function StartVideo() {
    sldpPlayer = SLDP.init({
        container: 'player',
        stream_url: "ws://5.189.178.119:8081/live/live1",
        initial_resolution: '240p',
        buffering: 200,
        autoplay: true,
        height: 720,
        width: 1280
    });
}


function StartVideo__() {

    //https://wowzaprod190-i.akamaihd.net/hls/live/761962/0I0p2dG9JMTz34Jp0Rn2ySe947FN562d/playlist.m3u8
    //http: //192.168.137.1:1935/ruletka/myStream/playlist.m3u8
    var player = WowzaPlayer.create("playerElement",
        {
            "license": "PTRL1-mkACG-K3ttT-v74XR-6djew-DAJMR",
            "sources": [
                {
                    "sourceURL":
                        "wss://edge.cdn.wowza.com/live/_definst_/0P0p2dG9JMTFxY2huZmhiU29EdW15759/stream.ws"
                },
                {
                    "sourceURL":
                        "https://wowzaprod192-i.akamaihd.net/hls/live/768990/0P0p2dG9JMTFxY2huZmhiU29EdW15759/playlist.m3u8"
                }
            ],
            "title": "",
            "description": "",
            "startAtLivePoint": true,
            "uiShowDurationVsTimeRemaining": true,
            "uiShowQuickRewind": true,
            "autoPlay": false,
            "mute": false,
            "volume": 75
        }
    );


    onStateChangedListener = function(stateChangedEvent) {
        if (stateChangedEvent.currentState == WowzaPlayer.State.PLAYING) {
            console.log('Playing');
        } else if (stateChangedEvent.currentState == WowzaPlayer.State.PAUSED) {
            console.log('Paused');
        }
    }

    playListener = function(playEvent) {
        console.log('Time: ' + playEvent.time);
        test();
    };

    player.onPlay(playListener);
    player.onStateChanged(onStateChangedListener);


    //setTimeout(updateStatus(), 100);
}

function test() {
    var vid = document.getElementById("playerElement-Video");

    if (vid.seekable && isFinite(vid.duration)) {
        console.log("Start: " + vid.seekable + " " + vid.seekable.length);
        console.log(vid.seekable.start(0));
        console.log(vid.seekable.end(0));
        vid.ondurationchange = function() {
            seek();
        };
        console.log("Setup finished!");
    } else {
        setTimeout(function() { test() }, 1000);
    }
}


function getDuration(player) {
    var seekable = player.seekable;
    return seekable && seekable.length ? seekable.end(0) - seekable.start(0) : 0;
}

function resetSpeed() {
    var vid = document.getElementById("playerElement-Video");
    vid.playbackRate = 1;
    console.log('rate set to 1');
}

function seek() {
    if (lastState && (lastState.alignVideo == 1)) {
        //console.log("aligning ...");
        var vid = document.getElementById("playerElement-Video");
        var duration = getDuration(vid);
        var seekable = vid.seekable;

        if (duration - vid.currentTime > 3) {
            console.log("diff: " + (duration - vid.currentTime));
            console.log("currentTime " + vid.currentTime + " duration " + duration);
            console.log("setcurtime: " +
                Math.max(0, Math.min(seekable.end(0), vid.currentTime + (duration - vid.currentTime))));

            vid.currentTime =
                Math.max(0, Math.min(seekable.end(0), vid.currentTime + (duration - vid.currentTime - 2)));

            console.log('after');
            console.log("currentTime " + vid.currentTime + " duration " + duration);
            console.log(vid.seekable.end(0));
        } else if (duration - vid.currentTime > 2) {
            console.log("diff: " + (duration - vid.currentTime));
            console.log("currentTime " + vid.currentTime + " duration " + duration);
            console.log("setcurtime: " +
                Math.max(0, Math.min(seekable.end(0), vid.currentTime + (duration - vid.currentTime))));

            //vid.currentTime = Math.max(0, Math.min(seekable.end(0), vid.currentTime + (duration - vid.currentTime - 2)));
            vid.playbackRate = 1.5;

            setTimeout(resetSpeed, 1000);
            console.log('rate set to ' + vid.playbackRate);
            console.log('after');
            console.log("currentTime " + vid.currentTime + " duration " + duration);
            console.log(vid.seekable.end(0));
        }
    }

}


var lastState = null;
var sound = new Sound("/Content/Sound/bell.mp3", 100, 0);
sound.init();

function setState(data) {
    if (lastState !== data) {
        if (data.End === 1) {
            $('#sendEnd').text("Начать сеанс");
        } else {
            $('#sendEnd').text("Конец сеанса");
        }
    }


    if (!lastState || lastState.Status != data.Status) {
        $('#command').html(data.Status == 1 ?  "SPIN" : "");

        if (data.Status === "") {
            $('#command').removeClass("green");
            $('#command').removeClass("white");
            $('#command').addClass("white");
        } else {

            $('#command').removeClass("white");
            $('#command').removeClass("green");
            $('#command').addClass("green");
        }
    }

    if (!lastState || lastState.Number !== data.Number) {
        $('#number').html(data.Number);
        $('#number').removeClass("red");
        $('#number').removeClass("green");
        $('#number').removeClass("black");

        if (data.Number == 0) {
            $('#number').addClass("green");
        } else if (data.number % 2 === 0) {
            $('#number').addClass("black");
        } else {
            $('#number').addClass("red");
        }
    }

    lastState = data;
}

function sendCard(number) {
    if (!confirm("Ставить номер " + number)) return;
    if (isNaN(number)) {
        alert("Invalid number");
        return;
    }
    if (lastState.Status != 1) {
        $('#command').html("<h3 class='red'>Подождите команды SPIN!</h3>");
        return;
    }
    $('#inf').html(' ');
    $('#inf').append('URL : /Round/SetCard');
    $('#inf').append('<br>');
    $('#inf').append('DATA : ' + JSON.stringify({ card: number }));
    $('#inf').append('<br>');
    $.ajax({
        url: '/Round/SetCard',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({ card: number }),
        processData: false,
        success: function (data, textStatus, jQxhr) {
            $('#inf').append(data);
            $('#inf').append('<br>');
            setState(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            $('#inf').append(errorThrown);
            $('#inf').append('<br>');
        }
    });
}

function sendStatus(status) {
    if (isNaN(status)) status = "0";
    var autoSeconds = $('#autoSeconds').val();
    $.ajax({
        url: '/Round/StartRound',
        dataType: 'json',
        type: 'post',
        contentType: 'application/json',
        data: JSON.stringify({ status: status, roundSeconds: autoSeconds }),
        processData: false,
        success: function(data, textStatus, jQxhr) {
            setState(data);
            console.log(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert(textStatus + errorThrown);
        }
    });
}

function updateStatus() {
    $.ajax({
        url: '/Round/Get',
        dataType: 'json',
        type: 'get',
        contentType: 'application/json',
        processData: false,
        success: function(data, textStatus, jQxhr) {
            setState(data);
        },
        error: function(jqXhr, textStatus, errorThrown) {
            alert(errorThrown);
        }
    });
    setTimeout(updateStatus, 1000);
}




function Sound(source, volume, loop) {
    this.source = source;
    this.volume = volume;
    this.loop = loop;
    var son;
    this.son = son;
    this.finish = false;
    this.stop = function () {
        document.body.removeChild(this.son);
    }
    this.start = function () {
        if (this.finish) return false;
        this.son = document.createElement("embed");
        this.son.setAttribute("src", this.source);
        this.son.setAttribute("hidden", "true");
        this.son.setAttribute("volume", this.volume);
        this.son.setAttribute("autostart", "true");
        this.son.setAttribute("loop", this.loop);
        document.body.appendChild(this.son);
    }
    this.remove = function () {
        document.body.removeChild(this.son);
        this.finish = true;
    }
    this.init = function (volume, loop) {
        this.finish = false;
        this.volume = volume;
        this.loop = loop;
    }
}
