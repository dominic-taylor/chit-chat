(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();

document.getElementById("chatbar").addEventListener("submit", function(e){
  let text = document.getElementById('m')
  socket.emit('message', text.value); //needs to be sanitized
  text.value = '';
  e.preventDefault();
});
document.getElementById('r').addEventListener('click', function () {
  var name = document.getElementById('this-player').innerHTML
  socket.emit('roll', name)
}, false)

document.getElementById("join").addEventListener("click", function(e){
  let name = document.getElementById('n').value
  if(name.length<1){name = 'Player #'+Math.floor(Math.random() * (100 - 2 + 1)) + 2}
  socket.emit('set user name', name);
  e.preventDefault();
});

document.getElementById("leave").addEventListener("click", function(e){
  leaveGame()
  e.preventDefault();
});

document.getElementById("findGame").addEventListener("click", function(e){
  joinGame()
  e.preventDefault();
});

socket.on('login', function (data) {
  connected = true;
  let message = 'Welcome to Pick-up Pong!';
  document.getElementById('this-player').innerHTML = data.username
  addMessage(message);
  addParticipantsMessage(data);
})

socket.on('user joined', function (data) {
  addMessage(data.username+ ' joined the lobby.')
  addParticipantsMessage(data)
})

socket.on('publish', function (data) {
  addMessage(data.username+ ":  " +data.message)
})

socket.on('rolled', function (data, num) {
  addMessage(data + ' rolled a '+num)
})
socket.on('gameCreated', function (data) {
  addMessage(data.username+ ' created a Game #'+data.gameId)
  //start game
})
socket.on('user left', function (data) {
  addMessage(data.username+ ' left the lobby.')
  addParticipantsMessage(data)
})

socket.on('joinSuccess', function (data) {
  addMessage(data.player+' joining Game #'+ data.gameId)
  console.log('joinedgame'+socket.gameId);

})

socket.on('alreadyJoined', function (data) {
  addMessage('You are in a Game, #'+ data.gameId)
})

socket.on('leftGame', function (data) {
  addMessage('Leaving Game #'+ data.gameId)
  console.log('leftgame'+socket.gameId);
})

socket.on('notInGame', function () {
  addMessage('You are not currently in a game')
})

socket.on('gameDestroyed', function (data) {
  addMessage(data.gameOwner+' destroyed game #'+data.gameId )
})
socket.on('update participants', function (data) {
  let playerlist = document.getElementById('player-list')
  playerlist.innerHTML = ''
    for (var i = 0; i < data.users.length; i++) {
      playerlist.innerHTML += '<li>'+data.users[i]
  }
})
function joinGame() {
  socket.emit('joinGame')
}
function sendGame(){
  socket.emit('makeGame');
};

function leaveGame() {
  socket.emit('leaveGame');
}
function addMessage(message) {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  document.getElementById('messages').appendChild(li)
  var box = document.getElementById('messages');
  box.scrollTop = box.scrollHeight;
}

function addParticipantsMessage(data) {
  let message = ''
  if(data.numUsers === 1){
    message = 'One person in lobby.'
  }else{
    message = 'There are '+ data.numUsers+ ' players in the lobby'
  }
  addMessage(message)
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc29ja2V0ID0gaW8oKTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ20nKVxuICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHRleHQudmFsdWUpOyAvL25lZWRzIHRvIGJlIHNhbml0aXplZFxuICB0ZXh0LnZhbHVlID0gJyc7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUxcbiAgc29ja2V0LmVtaXQoJ3JvbGwnLCBuYW1lKVxufSwgZmFsc2UpXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9pblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ24nKS52YWx1ZVxuICBpZihuYW1lLmxlbmd0aDwxKXtuYW1lID0gJ1BsYXllciAjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMiArIDEpKSArIDJ9XG4gIHNvY2tldC5lbWl0KCdzZXQgdXNlciBuYW1lJywgbmFtZSk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxlYXZlXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgbGVhdmVHYW1lKClcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZEdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICBqb2luR2FtZSgpXG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5zb2NrZXQub24oJ2xvZ2luJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29ubmVjdGVkID0gdHJ1ZTtcbiAgbGV0IG1lc3NhZ2UgPSAnV2VsY29tZSB0byBQaWNrLXVwIFBvbmchJztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MID0gZGF0YS51c2VybmFtZVxuICBhZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpO1xufSlcblxuc29ja2V0Lm9uKCd1c2VyIGpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgJyBqb2luZWQgdGhlIGxvYmJ5LicpXG4gIGFkZFBhcnRpY2lwYW50c01lc3NhZ2UoZGF0YSlcbn0pXG5cbnNvY2tldC5vbigncHVibGlzaCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgXCI6ICBcIiArZGF0YS5tZXNzYWdlKVxufSlcblxuc29ja2V0Lm9uKCdyb2xsZWQnLCBmdW5jdGlvbiAoZGF0YSwgbnVtKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YSArICcgcm9sbGVkIGEgJytudW0pXG59KVxuc29ja2V0Lm9uKCdnYW1lQ3JlYXRlZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgJyBjcmVhdGVkIGEgR2FtZSAjJytkYXRhLmdhbWVJZClcbiAgLy9zdGFydCBnYW1lXG59KVxuc29ja2V0Lm9uKCd1c2VyIGxlZnQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUrICcgbGVmdCB0aGUgbG9iYnkuJylcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxufSlcblxuc29ja2V0Lm9uKCdqb2luU3VjY2VzcycsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS5wbGF5ZXIrJyBqb2luaW5nIEdhbWUgIycrIGRhdGEuZ2FtZUlkKVxuICBjb25zb2xlLmxvZygnam9pbmVkZ2FtZScrc29ja2V0LmdhbWVJZCk7XG5cbn0pXG5cbnNvY2tldC5vbignYWxyZWFkeUpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoJ1lvdSBhcmUgaW4gYSBHYW1lLCAjJysgZGF0YS5nYW1lSWQpXG59KVxuXG5zb2NrZXQub24oJ2xlZnRHYW1lJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZSgnTGVhdmluZyBHYW1lICMnKyBkYXRhLmdhbWVJZClcbiAgY29uc29sZS5sb2coJ2xlZnRnYW1lJytzb2NrZXQuZ2FtZUlkKTtcbn0pXG5cbnNvY2tldC5vbignbm90SW5HYW1lJywgZnVuY3Rpb24gKCkge1xuICBhZGRNZXNzYWdlKCdZb3UgYXJlIG5vdCBjdXJyZW50bHkgaW4gYSBnYW1lJylcbn0pXG5cbnNvY2tldC5vbignZ2FtZURlc3Ryb3llZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS5nYW1lT3duZXIrJyBkZXN0cm95ZWQgZ2FtZSAjJytkYXRhLmdhbWVJZCApXG59KVxuc29ja2V0Lm9uKCd1cGRhdGUgcGFydGljaXBhbnRzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgbGV0IHBsYXllcmxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWxpc3QnKVxuICBwbGF5ZXJsaXN0LmlubmVySFRNTCA9ICcnXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnVzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwbGF5ZXJsaXN0LmlubmVySFRNTCArPSAnPGxpPicrZGF0YS51c2Vyc1tpXVxuICB9XG59KVxuZnVuY3Rpb24gam9pbkdhbWUoKSB7XG4gIHNvY2tldC5lbWl0KCdqb2luR2FtZScpXG59XG5mdW5jdGlvbiBzZW5kR2FtZSgpe1xuICBzb2NrZXQuZW1pdCgnbWFrZUdhbWUnKTtcbn07XG5cbmZ1bmN0aW9uIGxlYXZlR2FtZSgpIHtcbiAgc29ja2V0LmVtaXQoJ2xlYXZlR2FtZScpO1xufVxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpLmFwcGVuZENoaWxkKGxpKVxuICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG4gIGJveC5zY3JvbGxUb3AgPSBib3guc2Nyb2xsSGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpIHtcbiAgbGV0IG1lc3NhZ2UgPSAnJ1xuICBpZihkYXRhLm51bVVzZXJzID09PSAxKXtcbiAgICBtZXNzYWdlID0gJ09uZSBwZXJzb24gaW4gbG9iYnkuJ1xuICB9ZWxzZXtcbiAgICBtZXNzYWdlID0gJ1RoZXJlIGFyZSAnKyBkYXRhLm51bVVzZXJzKyAnIHBsYXllcnMgaW4gdGhlIGxvYmJ5J1xuICB9XG4gIGFkZE1lc3NhZ2UobWVzc2FnZSlcbn1cbiJdfQ==
