var uuid = require('uuid');
var dgram = require('dgram');
var s = dgram.createSocket('udp4');
const INTERVAL = 1000
const ADDRESS = "230.522.23.7"
const PORT = 2111


// Creation of a musician
var musi  = new Object();
musi.instrument = process.argv[2];
musi.uuid = uuid();

// Assign a sound to a musician by looking his instrument.
switch(musi.instrument){
    case "piano":
        musi.sound = "ti-ta-ti";
        break;
    case "trumpet":
        musi.sound = "pouet";
        break;
    case "flute":
        musi.sound = "trulu";
        break;
    case "violin":
        musi.sound = "gzi-gzi";
        break;
    case "drum":
        musi.sound = "boum-boum";
        break;
    default:
        musi.sound = "undefined";
        break;
}


var payload = JSON.stringify(musi);

// Call the fonction each INTERVAL ms
setInterval(function(){
    message = new Buffer(payload);
    s.send(message, 0, message.length, PORT, ADDRESS, function(err, bytes){}); 
    // We send to multicast adress.
}, INTERVAL);

