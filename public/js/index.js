var socket = io();

socket.on('connect' , function() {
  console.log('Connected to server');

  socket.emit('createMessage', {from : 'akaash', text : 'yo from index.js'});
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage' , function (newMessage) {
  console.log('New Message', newMessage);
});
