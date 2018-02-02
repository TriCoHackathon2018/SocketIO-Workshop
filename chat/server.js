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


app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});


// When a user connects, they are assigned their own socket object
// which the server uses to send them messages.
io.on('connection', function(socket) {
    console.log("a user connected");

    // Note that this is a local variable,
    // so it's only this client's username.
    var username = "";
    
    socket.on("disconnect", function() {
	console.log("a user disconnected");
    });

    // These events happen when the client does "socket.emit("event", data)"
    // Note that some events are reserved. See them at
    // https://socket.io/docs/emit-cheatsheet/
    
    socket.on("message", function(message) {
	// Receive a message from the client (data is the message)

	//... and then send it to everyone else who is connected
	// Note that this doesn't send it to the
	// current client. To do that, use io.emit
	var data = {
	    username: username,
	    message: message
	};
	socket.broadcast.emit("message", data);

    });
    
    socket.on("setUsername", function(newName) {
	username = newName;
    });

});


http.listen(port, function() {
    console.log("Listening on " + port + ". Go to 'localhost:" + port + "'");
});
