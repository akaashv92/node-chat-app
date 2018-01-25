var socket = io();

socket.on('connect' , function() {
  console.log('Connected to server');
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('newMessage' , function (newMessage) {
  console.log('New Message', newMessage);
  var li = $('<li></li>');

  li.text(`${newMessage.from} : ${newMessage.text}`);
  $("#messages").append(li);
});

// socket.emit('createMessage', {
//   from : 'frank',
//   text :'Hi'
// }, function (data) {
//   console.log('Got it', data);
// });

$('#message-form').on('submit', function(e) {
  e.preventDefault();

  socket.emit('createMessage', {
    from : 'User',
    text : $('[name=message]').val(),
  }, function(data) {

  });
});
