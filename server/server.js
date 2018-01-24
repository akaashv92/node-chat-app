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
  console.log('New user conencted');

  socket.emit('newMessage',{
    from : 'Mike',
    text : 'Yo from server.js',
    createdAt : '123'
  });

  socket.on('createMessage', (message) => {
    console.log(message);
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
})
