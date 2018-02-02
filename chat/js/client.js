// Makes the socket.io object for the client to use.
var socket = io();


// Grabs the html element with the id "chat form"
var chatForm = document.getElementById("chat form");


// Every client has their own unique ID given by the server
var ID;
socket.on("onConnection", function(newID) {
    // Gets this client's ID
    ID = newID;
});

// Whenever the send button is pressed, this function is called
chatForm.onsubmit = function() {

    // chatForm.message refers to the section under "form"
    // with the id "message". It's value is the string
    // that the user typed.
    var message = chatForm.message.value;

    // First of all, display the message on our screen
    postMessage(message);

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
function postMessage(message) {
    if (message) {
	console.log(message);

	// Grab a reference to the list of past messages
	var ul = document.getElementById("messages");

	// Create a new list node that will be appended to the list
	var li = document.createElement("li");

	// Add text to the newly created node
	li.appendChild(document.createTextNode(message));

	// Append the node to the list
	ul.appendChild(li);
    }
};
