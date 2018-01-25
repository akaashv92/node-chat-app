const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');


const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));

  socket.broadcast.emit('newMessage', generateMessage('Admin', 'New User joined'));

  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage' , generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
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
