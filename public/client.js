// const io = require('socket.io')();
const $ = require('jquery');
var socket = io();

function scrollMessageBox() {
  var box = document.getElementById('messages');
  box.scrollTop = box.scrollHeight;
}

$('form').submit(function(){
  // socket.emit('chat message', $('#m').val());
  let m = document.getElementById('m')
  socket.emit('chat message', m.value);
  m.value = '';
  return false;
});
socket.on('chat message', function (msg) {
  $('#messages').append($('<li>').text(msg));
  scrollMessageBox()

})

document.getElementById('r').addEventListener('click', function () {
  socket.emit('roll')
}, false)

socket.on('roll', function (num) {
  $('#messages').append($('<li>').text('rolled a '+num));
  scrollMessageBox()

})
