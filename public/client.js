// const io = require('socket.io')();
const $ = require('jquery');
var socket = io();

$('form').submit(function(){
  socket.emit('chat message', $('#m').val());
  $('#m').val('');
  return false;
});
socket.on('chat message', function (msg) {
  $('#messages').append($('<li>').text(msg));
})

document.getElementById('r').addEventListener('click', function () {
  socket.emit('roll')
}, false)

socket.on('roll', function (num) {
  $('#messages').append($('<li>').text('rolled a '+num));
})
