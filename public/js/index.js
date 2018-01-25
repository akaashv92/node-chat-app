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

socket.on('newLocationMessage', function (message) {
  var li = $('<li></li>');
  var a  = $('<a target="_blank">My current location</a>');

  li.text(`${message.from}`);
  a.attr('href',message.url);
  li.append(a);
  $("#messages").append(li);
});

$('#message-form').on('submit', function(e) {
  e.preventDefault();
  socket.emit('createMessage', {
    from : 'User',
    text : $('[name=message]').val(),
  }, function() {
    $('[name=message]').val('');
  });
});

jQuery('#send-location').on('click', function() {
  if(!navigator.geolocation){
    return alert('Geo Location not supported by your browser');
  }
  jQuery('#send-location').attr('disabled','disabled').text('Sending location...');
  navigator.geolocation.getCurrentPosition(function (position) {
    socket.emit('createLocationMessage', {
      latitude : position.coords.latitude,
      longitude : position.coords.longitude
    });
    jQuery('#send-location').removeAttr('disabled').text('Send Location');
  }, function() {
    jQuery('#send-location').removeAttr('disabled').text('Send Location');
    alert('Geo Location not supported by your browser');
  });
});
