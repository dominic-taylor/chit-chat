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

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNvY2tldCA9IGlvKCk7XG5cbmZ1bmN0aW9uIHNjcm9sbE1lc3NhZ2VCb3goKSB7XG4gIHZhciBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKTtcbiAgYm94LnNjcm9sbFRvcCA9IGJveC5zY3JvbGxIZWlnaHQ7XG59XG5mdW5jdGlvbiBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSlcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJykuYXBwZW5kQ2hpbGQobGkpXG4gIHNjcm9sbE1lc3NhZ2VCb3goKVxufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXRiYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKXtcbiAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbScpXG4gIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MXG4gIHNvY2tldC5lbWl0KCdtZXNzYWdlJywgdGV4dC52YWx1ZSk7IC8vbmVlZHMgdG8gYmUgc2FuaXRpemVkIGZvciBzZWN1cml0eVxuICB0ZXh0LnZhbHVlID0gJyc7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvaW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduJykudmFsdWVcbiAgaWYobmFtZS5sZW5ndGg8MSl7bmFtZSA9ICdQbGF5ZXIjJytNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoMTAwIC0gMiArIDEpKSArIDJ9XG4gIHNvY2tldC5lbWl0KCdzZXQgdXNlciBuYW1lJywgbmFtZSk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy9PbmNlIHVzZXIgaGFzIGNob3NlbiBuYW1lLCBhbGxvdyB0byBjaGFuZ2UgbmFtZT9cbn0pO1xuXG5zb2NrZXQub24oJ2FkZGVkIHVzZXInLCBmdW5jdGlvbihkYXRhKXtcbiAgLy91cGRhdGUgcGxhdWVyIGxpc3RcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MID0gZGF0YS5uZXdQbGF5ZXJcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBkYXRhLnVzZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3BsYXllci1saXN0JykuaW5uZXJIVE1MICs9ICc8bGk+JytkYXRhLnVzZXJzW2ldXG4gIH1cbiAgLy9ub3RpZnkgYWxsIHVzZXJzIGEgbmV3IHBsYXllciBoYXMgam9pbmVkLlxuICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHt1c2VyTmFtZTonTk9USUNFOicsIG1lc3NhZ2U6ZGF0YS5uZXdQbGF5ZXIrJyBoYXMgam9pbmVkJ30pXG59KVxuXG5zb2NrZXQub24oJ3B1Ymxpc2gnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25zb2xlLmxvZyhKU09OLnN0cmluZ2lmeShkYXRhKSk7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgXCI6ICBcIiArZGF0YS5tZXNzYWdlKVxufSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUxcbiAgc29ja2V0LmVtaXQoJ3JvbGwnLCBuYW1lKVxufSwgZmFsc2UpXG5cbnNvY2tldC5vbigncm9sbGVkJywgZnVuY3Rpb24gKGRhdGEsIG51bSkge1xuICBhZGRNZXNzYWdlKGRhdGEgKyAnIHJvbGxlZCBhICcrbnVtKVxufSlcblxuc29ja2V0Lm9uKCdsb2dpbicsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGNvbm5lY3RlZCA9IHRydWU7XG4gIGxldCBtZXNzYWdlID0gJ1dlbGNvbWUgdG8gdGhlIEdhbWUhJztcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RoaXMtcGxheWVyJykuaW5uZXJIVE1MID0gZGF0YS51c2VybmFtZVxuICBhZGRNZXNzYWdlKG1lc3NhZ2UpO1xuICBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpO1xuXG59KVxuXG5zb2NrZXQub24oJ3VzZXIgam9pbmVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lKyAnIGpvaW5lZCEnKVxuICBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpXG59KVxuXG5zb2NrZXQub24oJ3VzZXIgbGVmdCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSsgJyBsZWZ0IHRoZSBsb2JieS4nKVxuICBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpXG59KVxuXG5mdW5jdGlvbiBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpIHtcbiAgbGV0IG1lc3NhZ2UgPSAnJ1xuICBpZihkYXRhLm51bVVzZXJzID09PSAxKXtcbiAgICBtZXNzYWdlKz0nIE9uZSBwZXJzb24gaW4gZ2FtZSdcbiAgfWVsc2V7XG4gICAgbWVzc2FnZSs9ICcgVGhlcmUgYXJlICcrIGRhdGEubnVtVXNlcnMrICcgcGxheWVycyBpbiB0aGUgbG9iYnknXG4gIH1cbiAgYWRkTWVzc2FnZShtZXNzYWdlKVxuICAvLyBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEudXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgLy8gICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncGxheWVyLWxpc3QnKS5pbm5lckhUTUwgKz0gJzxsaT4nK2RhdGEudXNlcnNbaV1cbiAgLy8gfVxufVxuIl19
