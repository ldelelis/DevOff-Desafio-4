"use strict";

var chatbox = document.querySelector("#chatbox");
var usernameInput = document.querySelector("#username");
var messageInput = document.querySelector("#message-field");
var usernameForm = document.querySelector("#username-form");
var messageForm = document.querySelector("#message-form");
var imageField = document.querySelector("#image-field");

// Declare "global" values
// Sorry, college teachers
var username = null;
var stompClient = null;

function _createMessage(content) {
    var messageLine = document.createElement("li");
    var messageContent = document.createTextNode(content)

    messageLine.appendChild(messageContent);

    return messageLine
}

function _createImage(b64) {
    var image = new Image();
    image.src = b64;

    return image;
}

function onUserJoin(user) {
    var userJoined = JSON.parse(user.body).joinedUser;
    
    var userJoinMessage = _createMessage(userJoined + " joined the chat!!!!");
    chatbox.appendChild(userJoinMessage);
}

function onUserLeave(user) {
    var userLeft = JSON.parse(user.body).leftUser;
    
    var userLeftMessage = _createMessage(userLeft + " left the chat :<");
    chatbox.appendChild(userLeftMessage);
}

function onNewMessage(message) {
    var messageBody = JSON.parse(message.body);

    var messageElement = _createMessage(messageBody.sender + ": " + messageBody.content);
    chatbox.appendChild(messageElement);
}

function onNewImage(image) {
    var imageBody = JSON.parse(image.body);
    console.log(" EN EL NEW IMAGE");
    console.log(imageBody);

    var imageElement = _createMessage(imageBody.sender + " has sent an image:");
    var chatImage = _createImage(imageBody.base64Image);
    imageElement.appendChild(chatImage);
    chatbox.appendChild(imageElement);
}

function onWsConnected() {
    chatbox.removeAttribute("hidden");

    // subscribe to topic
    stompClient.subscribe(
        "/topic/chat/join",
        onUserJoin
    );
    stompClient.subscribe(
        "/topic/chat/leave",
        onUserLeave
    );
    stompClient.subscribe(
        "/topic/chat",
        onNewMessage
    );

    // tell backend a new user joined
    stompClient.send(
        "/app/chat.joinUser",
        {},
        JSON.stringify({joinedUser: username})
    );
}

function wsConnect(event) {
    username = usernameInput.value.trim();

    if (username) {
        var socket = new SockJS("/ws");
        stompClient = Stomp.over(socket);

        stompClient.connect({}, onWsConnected, function() {}) //TODO: on error function at the end
    }

    event.preventDefault();
}

function sendMessage(event) {
    var messageContent = messageInput.value.trim();

    stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify({content: messageContent, sender: username})
    );

    messageInput.value = '';
    event.preventDefault();
}

function userLeave(event) {
    stompClient.send(
        "/app/chat.leaveUser",
        {},
        JSON.stringify({leftUser: username})
    );

    event.preventDefault();
}

function sendImage(event) {
    var imageContent = this.files[0];
    var fileReader = new FileReader();
    fileReader.readAsDataURL(imageContent);
    fileReader.onload = function() {
        console.debug(fileReader.result);
        stompClient.send(
            "/app/chat.sendImage",
            {},
            JSON.stringify({sender: username, base64Image: fileReader.result})
        );
    }
    fileReader.onerror = function(error) {
        console.error("err: " + error);
    }
    
    event.preventDefault();
}

usernameForm.addEventListener("submit", wsConnect, true);
messageForm.addEventListener("submit", sendMessage, true);
imageField.addEventListener("change", sendImage, true);
window.addEventListener("beforeunload", userLeave, true);