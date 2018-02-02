// Makes the socket.io object for the client to use.
var socket = io();

// Grab the current time
var time = new Date();

// Sends a message to the server
socket.emit("my event", "Hello, server! The time is: " + time);

