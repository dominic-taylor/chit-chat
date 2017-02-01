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
  document.getElementById('player-list').innerHTML = data.users

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsInZhciBzb2NrZXQgPSBpbygpO1xuXG5mdW5jdGlvbiBzY3JvbGxNZXNzYWdlQm94KCkge1xuICB2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG4gIGJveC5zY3JvbGxUb3AgPSBib3guc2Nyb2xsSGVpZ2h0O1xufVxuZnVuY3Rpb24gYWRkTWVzc2FnZShtZXNzYWdlKSB7XG4gIHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcbiAgbGkuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUobWVzc2FnZSkpXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtZXNzYWdlcycpLmFwcGVuZENoaWxkKGxpKVxuICBzY3JvbGxNZXNzYWdlQm94KClcbn1cblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCB0ZXh0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ20nKVxuICBsZXQgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTFxuICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHt1c2VyTmFtZTpuYW1lLCBtZXNzYWdlOnRleHQudmFsdWV9KTtcbiAgdGV4dC52YWx1ZSA9ICcnO1xuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJuYW1lXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSl7XG4gIGxldCBuYW1lID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ24nKS52YWx1ZVxuICBzb2NrZXQuZW1pdCgnc2V0IHVzZXIgbmFtZScsIHt1c2VyTmFtZTpuYW1lfSk7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbiAgLy9PbmNlIHVzZXIgaGFzIGNob3NlbiBuYW1lLCBhbGxvdyB0byBjaGFuZ2UgbmFtZT8gXG59KTtcblxuc29ja2V0Lm9uKCdhZGRlZCB1c2VyJywgZnVuY3Rpb24oZGF0YSl7XG4gIC8vdXBkYXRlIHBsYXVlciBsaXN0XG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEubmV3UGxheWVyXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbGlzdCcpLmlubmVySFRNTCA9IGRhdGEudXNlcnNcblxuICAvL25vdGlmeSBhbGwgdXNlcnMgYSBuZXcgcGxheWVyIGhhcyBqb2luZWQuXG4gIHNvY2tldC5lbWl0KCdtZXNzYWdlJywge3VzZXJOYW1lOidOT1RJQ0U6JywgbWVzc2FnZTpkYXRhLm5ld1BsYXllcisnIGhhcyBqb2luZWQnfSlcblxufSlcblxuc29ja2V0Lm9uKCdwdWJsaXNoJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJOYW1lKyBcIjogIFwiICtkYXRhLm1lc3NhZ2UpXG59KVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTFxuICBzb2NrZXQuZW1pdCgncm9sbCcsIHt1c2VyTmFtZTpuYW1lfSlcbn0sIGZhbHNlKVxuXG5zb2NrZXQub24oJ3JvbGxlZCcsIGZ1bmN0aW9uIChkYXRhLCBudW0pIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJOYW1lICsgJyByb2xsZWQgYSAnK251bSlcbn0pXG4iXX0=
