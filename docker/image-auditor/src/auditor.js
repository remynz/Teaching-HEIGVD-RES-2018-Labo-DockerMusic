var net = require('net');
var moment = require('moment');
var dgram = require('dgram');
var s = dgram.createSocket('udp4');
const TIME_OUT = 5000;
const ADDRESS = "230.522.23.7";
const PORT = 2111;


var musArr = [];

// Bind the server to the multicast address (for listening)
s.bind(PORT, function () {
    s.addMembership(ADDRESS);
});

// when message received
s.on('message', function (msg, src) {
    var musReceiv = JSON.parse(msg);

    // if we already received a message from this musician
    var i = 0;
    while (i < musArr.length){
        if (musArr[i].uuid == musReceiv.uuid) {
            musArr[i].lastMessage = moment();
            return;
        }
        i++;
    }

    // If the musician is "new"
    musReceiv.lastMessage = moment();
    musArr.push(musReceiv);
});

// Creating the TCP server
var serverTCP = net.createServer(function (socket) {
    for (var i = 0; i < musArr.length; i++) {
        // If the musician is silent for TIME_OUT ms, delete him/her from the array
        if (moment().diff(musArr[i].lastMessage) > TIME_OUT) {
            console.log(JSON.stringify(musArr[i]) + " is being deleted.")
            musArr.splice(i, 1);

        }
    }

    socket.write(JSON.stringify(musArr));
    socket.end();
});

// Making our server listening on the right port
serverTCP.listen(PORT);