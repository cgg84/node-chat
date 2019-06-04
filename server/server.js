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

    socket.emit('userConnected', {
        from: 'Admin',
        text: 'Welcome to our chat app!',
        createdAt: new Date().getTime()
    });

    socket.broadcast.emit('userConnected', {
        from: 'Admin',
        text: 'New user joined!',
        createdAt: new Date().getTime()
    });

    socket.on('createMessage', (newMessage) => {
        console.log('createMessage => ', newMessage);        
        // io => send to every connected socket
        io.emit('newMessage', {
            from: newMessage.from,
            text: newMessage.text,
            createdAt: new Date().getTime()
        });
        //anyone but the sender
        // socket.broadcast.emit('newMessage', {
        //     from: newMessage.from,
        //     text: newMessage.text,
        //     createdAt: new Date().getTime()
        // });
    });
});


server.listen(port, () => {
    console.log('Server is up on port: ', port)
});

