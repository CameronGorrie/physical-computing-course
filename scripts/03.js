nw.require('nwjs-j5-fix').fix();

nw.Window.get().showDevTools();

var particles = [];

window.addEventListener('DOMContentLoaded', function() {

    var canvas = document.getElementsByTagName('canvas')[0];
    var context = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    var five = nw.require('johnny-five');
    var board = new five.Board();

    board.on('ready', function() {

        console.log('board ready')

        var proximity = new five.Proximity({
            controller: '2Y0A21',
            pin: 'A0'
        });

        // callback function - execute something when the sensor range is between 8 - 70cm
        proximity.within([8, 70], 'cm', function() {

            var proximitySquared = Math.pow(70 - this.cm, 2);
            var count = proximitySquared / 100;
            var size = proximitySquared / 1000;
            var speed = proximitySquared / 50;

            for(var i = 0; i < count; i++) {

                var particle = new Particle({
                    x: canvas.width / 2,
                    y: canvas.height / 2,
                    radius: size,
                    speed: speed,
                    color: "#FFFFFF"
                });

                // draw 5 particles and push them into the array
                particles.push(particle);

            }

        });

    });

    Particle.startRendering(context, particles);

});
