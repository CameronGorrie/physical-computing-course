nw.require('nwjs-j5-fix').fix();

nw.Window.get().showDevTools();

window.addEventListener('DOMContentLoaded', function() {

    var osc = new Tone.Oscillator(440, 'sine').toMaster();
    osc.start();

    var five = nw.require('johnny-five');
    var board = new five.Board();

    board.on('ready', function() {

        console.log('board ready')

        var proximity = new five.Proximity({
            controller: '2Y0A21',
            pin: 'A0'
        });

        setInterval(function() {

            console.log(proximity.cm);

            if(proximity.cm > 8 && proximity.cm < 65) {

                // -Inifinity refers to complete silence
                if(osc.volume.value <= -Infinity) {
                    osc.volume.rampTo(-6, 0.02);
                } else {
                    osc.frequency.cancelScheduledValues();
                    osc.frequency.rampTo(proximity.cm * 20, 0.15);
                    document.getElementById('value').innerHTML = Math.round(proximity.cm) + 'cm';
                }

            } else {

                if(osc.volume.value > -Infinity) {
                    osc.volume.rampTo(-Infinity, 1);
                }

            }

        }, 50);

    });

});
