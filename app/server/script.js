window.PEER = new Peer();
window.PEER.on('open', function (id) {
    console.log(window.PEER.id);
}); //window.PEER.id == id


//single object used by sender and reciever
window.CONN = null;

//ONLY FOR SENDER
function connectPeer(peerid) {
    window.CONN = window.PEER.connect(peerid);
    window.CONN.on('open', function () {
        console.log(`CONNECTED TO ${peerid}`);
        window.CONN.send(`CONNECTED TO ${window.PEER.id}`);
    });

    window.CONN.on('data', function (data) {
        console.log(data);
    });
}

//ONLY FOR RECEIVER
window.PEER.on('connection', function (conn) {
    window.CONN = conn;
    window.CONN.on('data', function (data) {
        console.log(data);
    });
});

seedButton.addEventListener('click', function (event) {
    console.log(seedInput.files);
});