// Some boilerplate to set up an express server
var express = require("express");
var app = express();
var http = require("http").Server(app);
var port = 8000;


// Get a Unique User Identifier generator to keep track of clients more easily
var UUID = require("uuid/v4");


// Initializes the server's global socket.io object
var io = require("socket.io")(http);

// Serve everything in the js directory
// so clients can get /js/client.js and other files there
app.use('/js', express.static('js'));


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


// When a user connects, they are assigned their own socket object
// which the server uses to send them messages.
io.on('connection', function(socket) {
    console.log("a user connected");

    // Give the user a unique ID
    var ID = UUID();
    socket.emit("onConnection", ID);
    
    socket.on("disconnect", function() {
	console.log("a user disconnected");
    });

    // These events happen when the client does "socket.emit("event", data)"
    // Note that some events are reserved. See them at
    // https://socket.io/docs/emit-cheatsheet/
    
    socket.on("message", function(data) {
	// Receive a message from the client (data is the message)

	//... and then send it to everyone else who is connected
	// Note that this doesn't send it to the
	// current client. To do that, use io.emit
	socket.broadcast.emit("message", data);

    });
    
    
});


http.listen(port, function() {
    console.log("Listening on " + port + ". Go to 'localhost:" + port + "'");
});
