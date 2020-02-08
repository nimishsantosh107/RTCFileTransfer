var peer = new Peer();

//single object used by sender and reciever
window.CONN = null;

//ONLY FOR SENDER
function connectPeer(peerid) {
    window.CONN = peer.connect(peerid);
    window.CONN.on('open', function () {
        console.log(`CONNECTED TO ${peerid}`);
        window.CONN.send(`CONNECTED TO ${peer.id}`);
    });

    window.CONN.on('data', function (data) {
        console.log(data);
    });
}

//ONLY FOR RECEIVER
peer.on('connection', function (conn) {
    window.CONN = conn;
    window.CONN.on('data', function (data) {
        console.log(data);
    });
});

seedButton.addEventListener('click', function (event) {
    console.log(seedInput.files);
});