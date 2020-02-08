var peer = new Peer();

//INITIATOR USES SENDCONN, RESPONDER USES RECVCONN
var sendconn = null;
var recvconn = null;

function connectPeer(peerid) {
    sendconn = peer.connect(peerid);
    sendconn.on('open', function () {
        console.log(`CONNECTED TO ${peerid}`);
        sendconn.send(`CONNECTED TO ${peer.id}`);
    });

    sendconn.on('data', function (data) {
        console.log(data);
    });
}

peer.on('connection', function (conn) {
    recvconn = conn;
    recvconn.on('data', function (data) {
        console.log(data);
    });
});

seedButton.addEventListener('click', function (event) {
    console.log(seedInput.files);
});