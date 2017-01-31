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
  var name = 'Placeholder chatter'
  socket.emit('message', {userName:name, message:text.value});
  text.value = '';
  e.preventDefault();
});

socket.on('publish', function (player) {
  addMessage(player.userName+ ":  " +player.message)
})

document.getElementById('r').addEventListener('click', function () {
  var p = 'Placeholder player'
  socket.emit('roll', {userName:p})
}, false)

socket.on('rolled', function (player, num) {
  addMessage(player.userName + ' rolled a '+num)
})

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwidmFyIHNvY2tldCA9IGlvKCk7XG5cbmZ1bmN0aW9uIHNjcm9sbE1lc3NhZ2VCb3goKSB7XG4gIHZhciBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKTtcbiAgYm94LnNjcm9sbFRvcCA9IGJveC5zY3JvbGxIZWlnaHQ7XG59XG5mdW5jdGlvbiBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSlcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJykuYXBwZW5kQ2hpbGQobGkpXG4gIHNjcm9sbE1lc3NhZ2VCb3goKVxufVxuXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXRiYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKXtcbiAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbScpXG4gIHZhciBuYW1lID0gJ1BsYWNlaG9sZGVyIGNoYXR0ZXInXG4gIHNvY2tldC5lbWl0KCdtZXNzYWdlJywge3VzZXJOYW1lOm5hbWUsIG1lc3NhZ2U6dGV4dC52YWx1ZX0pO1xuICB0ZXh0LnZhbHVlID0gJyc7XG4gIGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuXG5zb2NrZXQub24oJ3B1Ymxpc2gnLCBmdW5jdGlvbiAocGxheWVyKSB7XG4gIGFkZE1lc3NhZ2UocGxheWVyLnVzZXJOYW1lKyBcIjogIFwiICtwbGF5ZXIubWVzc2FnZSlcbn0pXG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gIHZhciBwID0gJ1BsYWNlaG9sZGVyIHBsYXllcidcbiAgc29ja2V0LmVtaXQoJ3JvbGwnLCB7dXNlck5hbWU6cH0pXG59LCBmYWxzZSlcblxuc29ja2V0Lm9uKCdyb2xsZWQnLCBmdW5jdGlvbiAocGxheWVyLCBudW0pIHtcbiAgYWRkTWVzc2FnZShwbGF5ZXIudXNlck5hbWUgKyAnIHJvbGxlZCBhICcrbnVtKVxufSlcbiJdfQ==
