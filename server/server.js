const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');


const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from : "Admin",
    text : "Welcome to the Chat App",
    createdAt : new Date().getTime()
  });

  socket.broadcast.emit('newMessage', {
    from : "Admin",
    text : "New User joined",
    createdAt : new Date().getTime()
  });

  socket.on('createMessage', (message) => {
    console.log(message);
    io.emit('newMessage' , {
      from : message.from,
      text : message.text,
      createdAt : new Date().getTime()
    });
  });

  socket.on('disconnect', () => {
    console.log('disconnected from server (server.js)');
  });
});
app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//   res.send()
// })

server.listen(PORT, () => {
  console.log('Server running on port : ' +PORT);
});
