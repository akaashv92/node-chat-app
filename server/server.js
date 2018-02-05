const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');
const {generateMessage, generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
const {Users} = require('./utils/users');


const publicPath = path.join(__dirname,'../public');
const PORT = process.env.PORT || 3000;

var app = express();

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

io.on('connection', (socket) => {
  console.log('New user connected');


  socket.on('join' , (param, callback) => {
    if(!isRealString(param.name) || !isRealString(param.room)){
      return callback('Name and room not valid');
    }

    socket.join(param.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,param.name, param.room);

    io.to(param.room).emit('updateUsersList', users.getUserList(param.room));
    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.emit('newMessage', generateMessage('Admin', `${param.name} has joined`));


    callback();
  });
  socket.on('createMessage', (message, callback) => {
    console.log(message);
    io.emit('newMessage' , generateMessage(message.from, message.text));
    callback();
  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage', generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });
  socket.on('disconnect', () => {
      var user = users.removeUser(socket.id);
      if(user){
        io.to(user.room).emit('updateUsersList', users.getUserList(user.room));
        io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
      }
  });
});
app.use(express.static(publicPath));

// app.get('/', (req,res) => {
//   res.send()
// })

server.listen(PORT, () => {
  console.log('Server running on port : ' +PORT);
});
