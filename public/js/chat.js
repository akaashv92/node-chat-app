var socket = io();

function scrollToBottom (){
  var message = $('#messages');
  var newMessage = message.children('li:last-child');
  var clientHeight = message.prop('clientHeight');
  var scrollTop = message.prop('scrollTop');
  var scrollHeight = message.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if(clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    message.scrollTop(scrollHeight);
  }
}

socket.on('connect' , function() {
  var params = jQuery.deparam(window.location.search);

  socket.emit('join', params , function(err){
    if(err){
      alert(err);
      window.location.href = "/";
    } else {
      console.log('No error');
    }
  })
});

socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

socket.on('updateUsersList', function(users) {
  var ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });
  $('#users').html(ol);
  console.log('Update users list!!', users);
});


socket.on('newMessage' , function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });
  $("#messages").append(html);
  scrollToBottom();
});

socket.on('newLocationMessage', function (message) {
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    text: message.text,
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });
  $("#messages").append(html);
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
