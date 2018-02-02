// Makes the socket.io object for the client to use.
var socket = io();

// Sends a message to the server
socket.emit("my event", "Hello, server!");

