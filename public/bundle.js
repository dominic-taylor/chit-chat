(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();

document.getElementById("chatbar").addEventListener("submit", function(e){
  let text = document.getElementById('m')
  let name = document.getElementById('this-player').innerHTML
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
  let message = 'Welcome to the Game!';
  document.getElementById('this-player').innerHTML = data.username
  addMessage(message);
  addParticipantsMessage(data);
})

socket.on('user joined', function (data) {
  addMessage(data.username+ ' joined!')
  addParticipantsMessage(data)
})

socket.on('publish', function (data) {
  addMessage(data.username+ ":  " +data.message)
})

socket.on('rolled', function (data, num) {
  addMessage(data + ' rolled a '+num)
})

socket.on('user left', function (data) {
  addMessage(data.username+ ' left the lobby.')
  addParticipantsMessage(data)
})

socket.on('joinSuccess', function (data) {
  addMessage('Joining Game #'+ data.gameId)
})

socket.on('alreadyJoined', function (data) {
  addMessage('You are in a Game, #'+ data.gameId)
})

socket.on('leftGame', function (data) {
  addMessage('Leaving Game #'+ data.gameId)
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
    message = 'One person in game'
  }else{
    message = 'There are '+ data.numUsers+ ' players in the lobby'
  }
  addMessage(message)
}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzb2NrZXQgPSBpbygpO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXRiYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKXtcbiAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbScpXG4gIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MXG4gIHNvY2tldC5lbWl0KCdtZXNzYWdlJywgdGV4dC52YWx1ZSk7IC8vbmVlZHMgdG8gYmUgc2FuaXRpemVkXG4gIHRleHQudmFsdWUgPSAnJztcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTFxuICBzb2NrZXQuZW1pdCgncm9sbCcsIG5hbWUpXG59LCBmYWxzZSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2luXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbicpLnZhbHVlXG4gIGlmKG5hbWUubGVuZ3RoPDEpe25hbWUgPSAnUGxheWVyICMnK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyICsgMSkpICsgMn1cbiAgc29ja2V0LmVtaXQoJ3NldCB1c2VyIG5hbWUnLCBuYW1lKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVhdmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICBsZWF2ZUdhbWUoKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5kR2FtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gIGpvaW5HYW1lKClcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbnNvY2tldC5vbignbG9naW4nLCBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25uZWN0ZWQgPSB0cnVlO1xuICBsZXQgbWVzc2FnZSA9ICdXZWxjb21lIHRvIHRoZSBHYW1lISc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEudXNlcm5hbWVcbiAgYWRkTWVzc2FnZShtZXNzYWdlKTtcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKTtcbn0pXG5cbnNvY2tldC5vbigndXNlciBqb2luZWQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUrICcgam9pbmVkIScpXG4gIGFkZFBhcnRpY2lwYW50c01lc3NhZ2UoZGF0YSlcbn0pXG5cbnNvY2tldC5vbigncHVibGlzaCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgXCI6ICBcIiArZGF0YS5tZXNzYWdlKVxufSlcblxuc29ja2V0Lm9uKCdyb2xsZWQnLCBmdW5jdGlvbiAoZGF0YSwgbnVtKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YSArICcgcm9sbGVkIGEgJytudW0pXG59KVxuXG5zb2NrZXQub24oJ3VzZXIgbGVmdCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgJyBsZWZ0IHRoZSBsb2JieS4nKVxuICBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpXG59KVxuXG5zb2NrZXQub24oJ2pvaW5TdWNjZXNzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZSgnSm9pbmluZyBHYW1lICMnKyBkYXRhLmdhbWVJZClcbn0pXG5cbnNvY2tldC5vbignYWxyZWFkeUpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoJ1lvdSBhcmUgaW4gYSBHYW1lLCAjJysgZGF0YS5nYW1lSWQpXG59KVxuXG5zb2NrZXQub24oJ2xlZnRHYW1lJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZSgnTGVhdmluZyBHYW1lICMnKyBkYXRhLmdhbWVJZClcbn0pXG5cbnNvY2tldC5vbignbm90SW5HYW1lJywgZnVuY3Rpb24gKCkge1xuICBhZGRNZXNzYWdlKCdZb3UgYXJlIG5vdCBjdXJyZW50bHkgaW4gYSBnYW1lJylcbn0pXG5cbnNvY2tldC5vbignZ2FtZURlc3Ryb3llZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS5nYW1lT3duZXIrJyBkZXN0cm95ZWQgZ2FtZSAjJytkYXRhLmdhbWVJZCApXG59KVxuc29ja2V0Lm9uKCd1cGRhdGUgcGFydGljaXBhbnRzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgbGV0IHBsYXllcmxpc3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWxpc3QnKVxuICBwbGF5ZXJsaXN0LmlubmVySFRNTCA9ICcnXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnVzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBwbGF5ZXJsaXN0LmlubmVySFRNTCArPSAnPGxpPicrZGF0YS51c2Vyc1tpXVxuICB9XG59KVxuZnVuY3Rpb24gam9pbkdhbWUoKSB7XG4gIHNvY2tldC5lbWl0KCdqb2luR2FtZScpXG59XG5mdW5jdGlvbiBzZW5kR2FtZSgpe1xuICBzb2NrZXQuZW1pdCgnbWFrZUdhbWUnKTtcbn07XG5cbmZ1bmN0aW9uIGxlYXZlR2FtZSgpIHtcbiAgc29ja2V0LmVtaXQoJ2xlYXZlR2FtZScpO1xufVxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpLmFwcGVuZENoaWxkKGxpKVxuICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG4gIGJveC5zY3JvbGxUb3AgPSBib3guc2Nyb2xsSGVpZ2h0O1xufVxuXG5mdW5jdGlvbiBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpIHtcbiAgbGV0IG1lc3NhZ2UgPSAnJ1xuICBpZihkYXRhLm51bVVzZXJzID09PSAxKXtcbiAgICBtZXNzYWdlID0gJ09uZSBwZXJzb24gaW4gZ2FtZSdcbiAgfWVsc2V7XG4gICAgbWVzc2FnZSA9ICdUaGVyZSBhcmUgJysgZGF0YS5udW1Vc2VycysgJyBwbGF5ZXJzIGluIHRoZSBsb2JieSdcbiAgfVxuICBhZGRNZXNzYWdlKG1lc3NhZ2UpXG59XG4iXX0=
