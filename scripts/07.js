nw.require('nwjs-j5-fix').fix();

nw.Window.get().showDevTools();

window.addEventListener('DOMContentLoaded', function() {

    var five = nw.require('johnny-five');
    var board = new five.Board();

    board.on('ready', function() {

        var button = new five.Button({
            pin: 13,
            isPullup: true
        });

        var value = document.querySelector('div');

        button.on('press', function(){
            value.innerHTML = 'PRESS';
        });

        button.on('hold', function(){
            value.innerHTML = 'HOLD';
        });

        button.on('release', function(){
            value.innerHTML = 'RELEASE';
        });

    });

});
