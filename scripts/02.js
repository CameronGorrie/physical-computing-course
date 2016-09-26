nw.require('nwjs-j5-fix').fix();

var five = nw.require('johnny-five');
var board = new five.Board();

board.on('ready', function() {

    console.log('board ready!');

    var interval = 250;

    var led = new five.Led(13);
    led.blink();

    QuickSettings.create(100, 100, 'LED Settings')
        .addRange('interval', 50, 500, 250, 5, function(value){
            interval = value;
            led.blink(interval);
        })
        .addButton('toggle', function() {
            if (led.isRunning) {
                // stop, stops the callback but may leave the light on
                // off, turns the light off
                led.stop().off();
            } else {
                led.blink(interval);
            }
        });

});