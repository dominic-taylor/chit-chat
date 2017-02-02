(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();

function scrollMessageBox() {
  var box = document.getElementById('messages');
  box.scrollTop = box.scrollHeight;
}
function addMessage(message) {
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(message))
  document.getElementById('messages').appendChild(li)
  scrollMessageBox()
}

document.getElementById("chatbar").addEventListener("submit", function(e){
  let text = document.getElementById('m')
  let name = document.getElementById('this-player').innerHTML
  socket.emit('message', text.value); //needs to be sanitized for security
  text.value = '';
  e.preventDefault();
});

document.getElementById("create").addEventListener("click", function(e){
  let name = document.getElementById('n').value
  if(name.length<1){name = 'Player#'+Math.floor(Math.random() * (100 - 2 + 1)) + 2}
  socket.emit('set user name', name);
  sendGame()
  e.preventDefault();
  //Once user has chosen name, allow to change name?
});

document.getElementById("join").addEventListener("click", function(e){
  let name = document.getElementById('n').value
  if(name.length<1){name = 'Player#'+Math.floor(Math.random() * (100 - 2 + 1)) + 2}
  socket.emit('set user name', name);
  e.preventDefault();
  //Once user has chosen name, allow to change name?
});


socket.on('added user', function(data){
  //update plauer list
  document.getElementById('this-player').innerHTML = data.newPlayer
  for (var i = 0; i < data.users.length; i++) {
    document.getElementById('player-list').innerHTML += '<li>'+data.users[i]
  }
  //notify all users a new player has joined.
  socket.emit('message', {userName:'NOTICE:', message:data.newPlayer+' has joined'})
})

socket.on('publish', function (data) {
  console.log(JSON.stringify(data));
  addMessage(data.username+ ":  " +data.message)
})

document.getElementById('r').addEventListener('click', function () {
  var name = document.getElementById('this-player').innerHTML
  socket.emit('roll', name)
}, false)

socket.on('rolled', function (data, num) {
  addMessage(data + ' rolled a '+num)
})

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

socket.on('user left', function (data) {
  addMessage(data.username+ ' left the lobby.')
  addParticipantsMessage(data)
})

function addParticipantsMessage(data) {
  let message = ''
  if(data.numUsers === 1){
    message+=' One person in game'
  }else{
    message+= ' There are '+ data.numUsers+ ' players in the lobby'
  }
  addMessage(message)
  // for (var i = 0; i < data.users.length; i++) {
  //   document.getElementById('player-list').innerHTML += '<li>'+data.users[i]
  // }
}

function joinGame() {
  socket.emit('joinGame')
}
function sendGame(){
  socket.emit('makeGame');
};
socket.on('joinSuccess', function (data) {
  addMessage('Joining Game #', data.gameId)
})

socket.on('alreadyJoined', function (data) {
  addMessage('You are in a Game, #', data.gameId)
})

function leaveGame() {
  socket.emit('leaveGame');
}

socket.on('leftGame', function (data) {
  addMessage('Leaving Game #', data.gameId)
})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzb2NrZXQgPSBpbygpO1xuXG5mdW5jdGlvbiBzY3JvbGxNZXNzYWdlQm94KCkge1xuICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG4gIGJveC5zY3JvbGxUb3AgPSBib3guc2Nyb2xsSGVpZ2h0O1xufVxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpLmFwcGVuZENoaWxkKGxpKVxuICBzY3JvbGxNZXNzYWdlQm94KClcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ20nKVxuICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTFxuICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHRleHQudmFsdWUpOyAvL25lZWRzIHRvIGJlIHNhbml0aXplZCBmb3Igc2VjdXJpdHlcbiAgdGV4dC52YWx1ZSA9ICcnO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjcmVhdGVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduJykudmFsdWVcbiAgaWYobmFtZS5sZW5ndGg8MSl7bmFtZSA9ICdQbGF5ZXIjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMiArIDEpKSArIDJ9XG4gIHNvY2tldC5lbWl0KCdzZXQgdXNlciBuYW1lJywgbmFtZSk7XG4gIHNlbmRHYW1lKClcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvL09uY2UgdXNlciBoYXMgY2hvc2VuIG5hbWUsIGFsbG93IHRvIGNoYW5nZSBuYW1lP1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiam9pblwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ24nKS52YWx1ZVxuICBpZihuYW1lLmxlbmd0aDwxKXtuYW1lID0gJ1BsYXllciMnK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyICsgMSkpICsgMn1cbiAgc29ja2V0LmVtaXQoJ3NldCB1c2VyIG5hbWUnLCBuYW1lKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAvL09uY2UgdXNlciBoYXMgY2hvc2VuIG5hbWUsIGFsbG93IHRvIGNoYW5nZSBuYW1lP1xufSk7XG5cblxuc29ja2V0Lm9uKCdhZGRlZCB1c2VyJywgZnVuY3Rpb24oZGF0YSl7XG4gIC8vdXBkYXRlIHBsYXVlciBsaXN0XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEubmV3UGxheWVyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS51c2Vycy5sZW5ndGg7IGkrKykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbGlzdCcpLmlubmVySFRNTCArPSAnPGxpPicrZGF0YS51c2Vyc1tpXVxuICB9XG4gIC8vbm90aWZ5IGFsbCB1c2VycyBhIG5ldyBwbGF5ZXIgaGFzIGpvaW5lZC5cbiAgc29ja2V0LmVtaXQoJ21lc3NhZ2UnLCB7dXNlck5hbWU6J05PVElDRTonLCBtZXNzYWdlOmRhdGEubmV3UGxheWVyKycgaGFzIGpvaW5lZCd9KVxufSlcblxuc29ja2V0Lm9uKCdwdWJsaXNoJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc29sZS5sb2coSlNPTi5zdHJpbmdpZnkoZGF0YSkpO1xuICBhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUrIFwiOiAgXCIgK2RhdGEubWVzc2FnZSlcbn0pXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MXG4gIHNvY2tldC5lbWl0KCdyb2xsJywgbmFtZSlcbn0sIGZhbHNlKVxuXG5zb2NrZXQub24oJ3JvbGxlZCcsIGZ1bmN0aW9uIChkYXRhLCBudW0pIHtcbiAgYWRkTWVzc2FnZShkYXRhICsgJyByb2xsZWQgYSAnK251bSlcbn0pXG5cbnNvY2tldC5vbignbG9naW4nLCBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25uZWN0ZWQgPSB0cnVlO1xuICBsZXQgbWVzc2FnZSA9ICdXZWxjb21lIHRvIHRoZSBHYW1lISc7XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEudXNlcm5hbWVcbiAgYWRkTWVzc2FnZShtZXNzYWdlKTtcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKTtcblxufSlcblxuc29ja2V0Lm9uKCd1c2VyIGpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgJyBqb2luZWQhJylcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxufSlcblxuc29ja2V0Lm9uKCd1c2VyIGxlZnQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUrICcgbGVmdCB0aGUgbG9iYnkuJylcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxufSlcblxuZnVuY3Rpb24gYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKSB7XG4gIGxldCBtZXNzYWdlID0gJydcbiAgaWYoZGF0YS5udW1Vc2VycyA9PT0gMSl7XG4gICAgbWVzc2FnZSs9JyBPbmUgcGVyc29uIGluIGdhbWUnXG4gIH1lbHNle1xuICAgIG1lc3NhZ2UrPSAnIFRoZXJlIGFyZSAnKyBkYXRhLm51bVVzZXJzKyAnIHBsYXllcnMgaW4gdGhlIGxvYmJ5J1xuICB9XG4gIGFkZE1lc3NhZ2UobWVzc2FnZSlcbiAgLy8gZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnVzZXJzLmxlbmd0aDsgaSsrKSB7XG4gIC8vICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1saXN0JykuaW5uZXJIVE1MICs9ICc8bGk+JytkYXRhLnVzZXJzW2ldXG4gIC8vIH1cbn1cblxuZnVuY3Rpb24gam9pbkdhbWUoKSB7XG4gIHNvY2tldC5lbWl0KCdqb2luR2FtZScpXG59XG5mdW5jdGlvbiBzZW5kR2FtZSgpe1xuICBzb2NrZXQuZW1pdCgnbWFrZUdhbWUnKTtcbn07XG5zb2NrZXQub24oJ2pvaW5TdWNjZXNzJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZSgnSm9pbmluZyBHYW1lICMnLCBkYXRhLmdhbWVJZClcbn0pXG5cbnNvY2tldC5vbignYWxyZWFkeUpvaW5lZCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoJ1lvdSBhcmUgaW4gYSBHYW1lLCAjJywgZGF0YS5nYW1lSWQpXG59KVxuXG5mdW5jdGlvbiBsZWF2ZUdhbWUoKSB7XG4gIHNvY2tldC5lbWl0KCdsZWF2ZUdhbWUnKTtcbn1cblxuc29ja2V0Lm9uKCdsZWZ0R2FtZScsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoJ0xlYXZpbmcgR2FtZSAjJywgZGF0YS5nYW1lSWQpXG59KVxuIl19
