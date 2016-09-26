nw.Window.get().showDevTools();

var os = nw.require('os');
console.log('OS' + os.type());

$(document).ready(function() {

    $('body').append(`<p>Hostname ${os.hostname()}</p>`);

});

chrome.tts.speak('Hello World');