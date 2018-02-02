// Some boilerplate to set up an express server
var express = require("express");
var app = express();
var http = require("http").Server(app);
var port = 8000;

// Initializes the server's global socket.io object
var io = require("socket.io")(http);

// Serve everything in the js directory
// so clients can get /js/client.js and other files there
app.use('/js', express.static('js'));

// serve index.html
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

// When a user connects, they are assigned their own socket object
// which the server uses to send them messages.
io.on('connection', function(socket) {

    // These events happen when the client does "socket.emit("event", data)"
    // Note that some events are reserved. See them at
    // https://socket.io/docs/emit-cheatsheet/
    socket.on("my event", function(data) {
	console.log(data);
    });    
    
});


// Start the server
http.listen(port, function() {
    console.log("Listening on " + port + ". Go to 'localhost:" + port + "'");
});
