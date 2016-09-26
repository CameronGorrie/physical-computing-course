nw.require('nwjs-j5-fix').fix();

nw.Window.get().showDevTools();

window.addEventListener('DOMContentLoaded', function() {

    var five = nw.require('johnny-five');
    var board = new five.Board();

    board.on('ready', function() {

        console.log('board ready');

        var servo = new five.Servo({
            pin: 10,
            center: true
        });

        // servo.to(90);

        document.querySelector('input').addEventListener('keyup', function(e) {

            if (e.keyCode !== 13) { return; }

            console.log('enter');

            var positions = {
                'yes': 30,
                'maybe': 90,
                'no': 150
            }

            // Math gets a suitable index between 0-2
            var answer = ['yes', 'maybe', 'no'][Math.floor(Math.random() * 3)];

            servo.sweep();

            setTimeout(function(){
                servo.stop();
                servo.to(positions[answer]);
            }, 3000);

        });

    });

});
