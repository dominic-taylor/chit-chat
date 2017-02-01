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
  socket.emit('message', {userName:name, message:text.value});
  text.value = '';
  e.preventDefault();
});

document.getElementById("name").addEventListener("submit", function(e){
  let name = document.getElementById('n').value
  socket.emit('set user name', {userName:name});
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
  addMessage(data.userName+ ":  " +data.message)
})

document.getElementById('r').addEventListener('click', function () {
  var name = document.getElementById('this-player').innerHTML
  socket.emit('roll', {userName:name})
}, false)

socket.on('rolled', function (data, num) {
  addMessage(data.userName + ' rolled a '+num)
})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc29ja2V0ID0gaW8oKTtcblxuZnVuY3Rpb24gc2Nyb2xsTWVzc2FnZUJveCgpIHtcbiAgdmFyIGJveCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpO1xuICBib3guc2Nyb2xsVG9wID0gYm94LnNjcm9sbEhlaWdodDtcbn1cbmZ1bmN0aW9uIGFkZE1lc3NhZ2UobWVzc2FnZSkge1xuICB2YXIgbGkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlcIik7XG4gIGxpLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKG1lc3NhZ2UpKVxuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKS5hcHBlbmRDaGlsZChsaSlcbiAgc2Nyb2xsTWVzc2FnZUJveCgpXG59XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiY2hhdGJhclwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpe1xuICBsZXQgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtJylcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUxcbiAgc29ja2V0LmVtaXQoJ21lc3NhZ2UnLCB7dXNlck5hbWU6bmFtZSwgbWVzc2FnZTp0ZXh0LnZhbHVlfSk7XG4gIHRleHQudmFsdWUgPSAnJztcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibmFtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmN0aW9uKGUpe1xuICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCduJykudmFsdWVcbiAgc29ja2V0LmVtaXQoJ3NldCB1c2VyIG5hbWUnLCB7dXNlck5hbWU6bmFtZX0pO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIC8vT25jZSB1c2VyIGhhcyBjaG9zZW4gbmFtZSwgYWxsb3cgdG8gY2hhbmdlIG5hbWU/XG59KTtcblxuc29ja2V0Lm9uKCdhZGRlZCB1c2VyJywgZnVuY3Rpb24oZGF0YSl7XG4gIC8vdXBkYXRlIHBsYXVlciBsaXN0XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEubmV3UGxheWVyXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS51c2Vycy5sZW5ndGg7IGkrKykge1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbGlzdCcpLmlubmVySFRNTCArPSAnPGxpPicrZGF0YS51c2Vyc1tpXVxuICB9XG5cbiAgLy9ub3RpZnkgYWxsIHVzZXJzIGEgbmV3IHBsYXllciBoYXMgam9pbmVkLlxuICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHt1c2VyTmFtZTonTk9USUNFOicsIG1lc3NhZ2U6ZGF0YS5uZXdQbGF5ZXIrJyBoYXMgam9pbmVkJ30pXG5cbn0pXG5cbnNvY2tldC5vbigncHVibGlzaCcsIGZ1bmN0aW9uIChkYXRhKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VyTmFtZSsgXCI6ICBcIiArZGF0YS5tZXNzYWdlKVxufSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3InKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgdmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUxcbiAgc29ja2V0LmVtaXQoJ3JvbGwnLCB7dXNlck5hbWU6bmFtZX0pXG59LCBmYWxzZSlcblxuc29ja2V0Lm9uKCdyb2xsZWQnLCBmdW5jdGlvbiAoZGF0YSwgbnVtKSB7XG4gIGFkZE1lc3NhZ2UoZGF0YS51c2VyTmFtZSArICcgcm9sbGVkIGEgJytudW0pXG59KVxuIl19
