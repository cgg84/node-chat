const path = require('path');
const http = require('http');
const publicPath = path.join(__dirname, '../public');
const experss = require('express');
const socketIO = require('socket.io');

var app = experss();
const port = process.env.PORT || 3000;

var server = http.createServer(app);
var io = socketIO(server);

app.use(experss.static(publicPath));

io.on('connection', (socket) => {
    console.log('new user connected!');

    socket.on('disconnect', () => {
        console.log('client disconnected');
    });

    socket.emit('newMessage', {
        from: 'chen',
        text: 'Hey dude!',
        createAt: 123
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage => ', newMessage);
    })
});


server.listen(port, () => {
    console.log('Server is up on port: ', port)
});

