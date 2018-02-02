// Makes the socket.io object for the client to use.
var socket = io();

var username;
window.onload = function() {
    username = window.prompt("Enter a Username");
    socket.emit("setUsername", username);
};

// Grabs the html element with the id "chat form"
var chatForm = document.getElementById("chat form");


// Whenever the send button is pressed, this function is called
chatForm.onsubmit = function() {

    // chatForm.message refers to the section under "form"
    // with the id "message". It's value is the string
    // that the user typed.
    var message = chatForm.message.value;

    // First of all, display the message on our screen
    var data = {
	username : username,
	message : message
    };
    postMessage(data);

    // Send the message to the server
    socket.emit("message", message);

    // Clear the text in the textbox
    chatForm.message.value = "";
    
    // Return false to prevent the form submission
    // from reloading the page.
    return false; 
};

// This is called whenever the client receives a message
socket.on("message", postMessage);


// Note that it's okay to define postMessage after using it
// because function definitions are hoisted to the top
// of the file before being used.
function postMessage(data) {
    if (data) {
	console.log(data);

	// Grab a reference to the list of past messages
	var ul = document.getElementById("messages");

	// Create a new list node that will be appended to the list
	var li = document.createElement("li");

	// Add text to the newly created node
	var message = data.username + ": " + data.message;
	li.appendChild(document.createTextNode(message));

	// Append the node to the list
	ul.appendChild(li);
    }
};
