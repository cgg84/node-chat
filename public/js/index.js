var socket = io();
socket.on("connect", function () {
    console.log("Connected to server!");
});

socket.on("disconnect", function () {
    console.log("Disconnected from the server");
});

socket.on('newMessage', function (message) {
    console.log('new message:', message);
});

socket.on('userConnected', function (message) {
    console.log('message from server: ', message);
});
