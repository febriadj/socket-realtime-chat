$(function () {
  var socket = io();
  $('form').submit(function (e) {
    e.preventDefault();
    socket.emit('chat message', $('#m').val());
    $('#m').val('');
    return false;
  });
  socket.on('chat message', function (msg) {
    $('#messages').append($('<p>').text(msg));
  });
});