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

//SEED FILE
seedButton.addEventListener('click', function (event) {
    seedInput.files[0].arrayBuffer().then((buf) => {
        window.BYTEARR = new Uint8Array(buf);
        console.log(window.BYTEARR);
    });
});

/* BUFFER */
// saveBuffer([ Uint8Array ], 'FILENAME');
const saveBuffer = (function () {
    var a = document.createElement("a");
    document.body.appendChild(a);
    a.style = "display: none";
    return function (data, name) {
        var blob = new Blob(data, {
                type: "octet/stream"
            }),
            url = window.URL.createObjectURL(blob);
        a.href = url;
        a.download = name;
        a.click();
        window.URL.revokeObjectURL(url);
    };
}());