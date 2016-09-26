nw.require('nwjs-j5-fix').fix();

nw.Window.get().showDevTools();

window.addEventListener('DOMContentLoaded', function() {

    var five = nw.require('johnny-five');
    var board = new five.Board();

    board.on('ready', function() {

        var led = new five.Led.RGB({
            pins: {
                red: 3,
                blue: 5,
                green: 6
            }
        });

        // led.strobe(500);

        var settings = QuickSettings.create(100, 100, 'RGB LED Settings')
            .addRange('intensity', 0, 100, 50, 1, function(){
                led.intensity(settings.getRangeValue('intensity'));
            })
            .addColor('color', '#FFFFFF', function() {
                led.color(settings.getColor('color'));
            })
            .addButton('toggle', function(){
                led.toggle();
            });

        var image = document.querySelector('img');
        var canvas = document.querySelector('canvas');
        var context = canvas.getContext('2d');

        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, image.width, image.height);

        canvas.addEventListener('mousemove', function(e) {
            // es6 destructuring - assigns each value in the array to getImageData
            var [r, g, b, a] = context.getImageData(e.clientX, e.clientY, 1, 1).data;
            led.color({red: r, green: g, blue: b});
        }, false);

    });

});
