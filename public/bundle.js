(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();
// if connected = true
// remove login div covering game board etc
//
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
  initGame(data)//start game
})

function initGame(data) {

  let board = document.getElementById('game-board')
  let div = document.createElement('div')

  div.style.width = "100px"
  div.style.height = "100px"
  div.style.background = 'red'
  div.style.color = 'white'
  div.style.margin = 'auto'
  div.innerHTML = data.username
  div.addEventListener("click", function (e) {
    //make this send to server
    let gameId = data.gameId
    let p = data.username
    let move = " did a move!"
    socket.emit('player move', {
        gameId: gameId,
        move: move
    })
    console.log('here is ', e.target.innerHTML);
  })
  board.appendChild(div)
}
  // add player button to board
  // with listner to hear paper scissors rock choice
socket.on('updateGame', function (data) {
  console.log(socket);
  console.log(data.username);
  console.log(data.username +' played: '+ data.move+'!!!');
})

socket.on('user left', function (data) {
  addMessage(data.username+ ' left the lobby.')
  addParticipantsMessage(data)
  connected = false;
})

socket.on('joinSuccess', function (data) {
  addMessage(data.player+' joining Game #'+ data.gameId)
  console.log('joinedgame '+data.gameId);
  initJoinGame(data)
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
  socket.emit('requestGame');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc29ja2V0ID0gaW8oKTtcbi8vIGlmIGNvbm5lY3RlZCA9IHRydWVcbi8vIHJlbW92ZSBsb2dpbiBkaXYgY292ZXJpbmcgZ2FtZSBib2FyZCBldGNcbi8vXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImNoYXRiYXJcIikuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jdGlvbihlKXtcbiAgbGV0IHRleHQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbScpXG4gIHNvY2tldC5lbWl0KCdtZXNzYWdlJywgdGV4dC52YWx1ZSk7IC8vbmVlZHMgdG8gYmUgc2FuaXRpemVkXG4gIHRleHQudmFsdWUgPSAnJztcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICB2YXIgbmFtZSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTFxuICBzb2NrZXQuZW1pdCgncm9sbCcsIG5hbWUpXG59LCBmYWxzZSlcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqb2luXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKXtcbiAgbGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbicpLnZhbHVlXG4gIGlmKG5hbWUubGVuZ3RoPDEpe25hbWUgPSAnUGxheWVyICMnK01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyICsgMSkpICsgMn1cbiAgc29ja2V0LmVtaXQoJ3NldCB1c2VyIG5hbWUnLCBuYW1lKTtcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGVhdmVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpe1xuICBsZWF2ZUdhbWUoKVxuICBlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJmaW5kR2FtZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSl7XG4gIGpvaW5HYW1lKClcbiAgZS5wcmV2ZW50RGVmYXVsdCgpO1xufSk7XG5cbnNvY2tldC5vbignbG9naW4nLCBmdW5jdGlvbiAoZGF0YSkge1xuICBjb25uZWN0ZWQgPSB0cnVlO1xuICBsZXQgbWVzc2FnZSA9ICdXZWxjb21lIHRvIFBpY2stdXAgUG9uZyEnO1xuICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUwgPSBkYXRhLnVzZXJuYW1lXG4gIGFkZE1lc3NhZ2UobWVzc2FnZSk7XG4gIGFkZFBhcnRpY2lwYW50c01lc3NhZ2UoZGF0YSk7XG59KVxuXG5zb2NrZXQub24oJ3VzZXIgam9pbmVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lKyAnIGpvaW5lZCB0aGUgbG9iYnkuJylcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxufSlcblxuc29ja2V0Lm9uKCdwdWJsaXNoJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lKyBcIjogIFwiICtkYXRhLm1lc3NhZ2UpXG59KVxuXG5zb2NrZXQub24oJ3JvbGxlZCcsIGZ1bmN0aW9uIChkYXRhLCBudW0pIHtcbiAgYWRkTWVzc2FnZShkYXRhICsgJyByb2xsZWQgYSAnK251bSlcbn0pXG5zb2NrZXQub24oJ2dhbWVDcmVhdGVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lKyAnIGNyZWF0ZWQgYSBHYW1lICMnK2RhdGEuZ2FtZUlkKVxuICBpbml0R2FtZShkYXRhKS8vc3RhcnQgZ2FtZVxufSlcblxuZnVuY3Rpb24gaW5pdEdhbWUoZGF0YSkge1xuXG4gIGxldCBib2FyZCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lLWJvYXJkJylcbiAgbGV0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXG5cbiAgZGl2LnN0eWxlLndpZHRoID0gXCIxMDBweFwiXG4gIGRpdi5zdHlsZS5oZWlnaHQgPSBcIjEwMHB4XCJcbiAgZGl2LnN0eWxlLmJhY2tncm91bmQgPSAncmVkJ1xuICBkaXYuc3R5bGUuY29sb3IgPSAnd2hpdGUnXG4gIGRpdi5zdHlsZS5tYXJnaW4gPSAnYXV0bydcbiAgZGl2LmlubmVySFRNTCA9IGRhdGEudXNlcm5hbWVcbiAgZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vbWFrZSB0aGlzIHNlbmQgdG8gc2VydmVyXG4gICAgbGV0IGdhbWVJZCA9IGRhdGEuZ2FtZUlkXG4gICAgbGV0IHAgPSBkYXRhLnVzZXJuYW1lXG4gICAgbGV0IG1vdmUgPSBcIiBkaWQgYSBtb3ZlIVwiXG4gICAgc29ja2V0LmVtaXQoJ3BsYXllciBtb3ZlJywge1xuICAgICAgICBnYW1lSWQ6IGdhbWVJZCxcbiAgICAgICAgbW92ZTogbW92ZVxuICAgIH0pXG4gICAgY29uc29sZS5sb2coJ2hlcmUgaXMgJywgZS50YXJnZXQuaW5uZXJIVE1MKTtcbiAgfSlcbiAgYm9hcmQuYXBwZW5kQ2hpbGQoZGl2KVxufVxuICAvLyBhZGQgcGxheWVyIGJ1dHRvbiB0byBib2FyZFxuICAvLyB3aXRoIGxpc3RuZXIgdG8gaGVhciBwYXBlciBzY2lzc29ycyByb2NrIGNob2ljZVxuc29ja2V0Lm9uKCd1cGRhdGVHYW1lJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgY29uc29sZS5sb2coc29ja2V0KTtcbiAgY29uc29sZS5sb2coZGF0YS51c2VybmFtZSk7XG4gIGNvbnNvbGUubG9nKGRhdGEudXNlcm5hbWUgKycgcGxheWVkOiAnKyBkYXRhLm1vdmUrJyEhIScpO1xufSlcblxuc29ja2V0Lm9uKCd1c2VyIGxlZnQnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUrICcgbGVmdCB0aGUgbG9iYnkuJylcbiAgYWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxuICBjb25uZWN0ZWQgPSBmYWxzZTtcbn0pXG5cbnNvY2tldC5vbignam9pblN1Y2Nlc3MnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKGRhdGEucGxheWVyKycgam9pbmluZyBHYW1lICMnKyBkYXRhLmdhbWVJZClcbiAgY29uc29sZS5sb2coJ2pvaW5lZGdhbWUgJytkYXRhLmdhbWVJZCk7XG4gIGluaXRKb2luR2FtZShkYXRhKVxufSlcblxuc29ja2V0Lm9uKCdhbHJlYWR5Sm9pbmVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZSgnWW91IGFyZSBpbiBhIEdhbWUsICMnKyBkYXRhLmdhbWVJZClcbn0pXG5cbnNvY2tldC5vbignbGVmdEdhbWUnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBhZGRNZXNzYWdlKCdMZWF2aW5nIEdhbWUgIycrIGRhdGEuZ2FtZUlkKVxuICBjb25zb2xlLmxvZygnbGVmdGdhbWUnK3NvY2tldC5nYW1lSWQpO1xufSlcblxuc29ja2V0Lm9uKCdub3RJbkdhbWUnLCBmdW5jdGlvbiAoKSB7XG4gIGFkZE1lc3NhZ2UoJ1lvdSBhcmUgbm90IGN1cnJlbnRseSBpbiBhIGdhbWUnKVxufSlcblxuc29ja2V0Lm9uKCdnYW1lRGVzdHJveWVkJywgZnVuY3Rpb24gKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLmdhbWVPd25lcisnIGRlc3Ryb3llZCBnYW1lICMnK2RhdGEuZ2FtZUlkIClcbn0pXG5zb2NrZXQub24oJ3VwZGF0ZSBwYXJ0aWNpcGFudHMnLCBmdW5jdGlvbiAoZGF0YSkge1xuICBsZXQgcGxheWVybGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbGlzdCcpXG4gIHBsYXllcmxpc3QuaW5uZXJIVE1MID0gJydcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGRhdGEudXNlcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHBsYXllcmxpc3QuaW5uZXJIVE1MICs9ICc8bGk+JytkYXRhLnVzZXJzW2ldXG4gIH1cbn0pXG5mdW5jdGlvbiBqb2luR2FtZSgpIHtcbiAgc29ja2V0LmVtaXQoJ2pvaW5HYW1lJylcbn1cbmZ1bmN0aW9uIHNlbmRHYW1lKCl7XG4gIHNvY2tldC5lbWl0KCdyZXF1ZXN0R2FtZScpO1xufTtcblxuZnVuY3Rpb24gbGVhdmVHYW1lKCkge1xuICBzb2NrZXQuZW1pdCgnbGVhdmVHYW1lJyk7XG59XG5mdW5jdGlvbiBhZGRNZXNzYWdlKG1lc3NhZ2UpIHtcbiAgdmFyIGxpID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpO1xuICBsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSlcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJykuYXBwZW5kQ2hpbGQobGkpXG4gIHZhciBib3ggPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKTtcbiAgYm94LnNjcm9sbFRvcCA9IGJveC5zY3JvbGxIZWlnaHQ7XG59XG5cbmZ1bmN0aW9uIGFkZFBhcnRpY2lwYW50c01lc3NhZ2UoZGF0YSkge1xuICBsZXQgbWVzc2FnZSA9ICcnXG4gIGlmKGRhdGEubnVtVXNlcnMgPT09IDEpe1xuICAgIG1lc3NhZ2UgPSAnT25lIHBlcnNvbiBpbiBsb2JieS4nXG4gIH1lbHNle1xuICAgIG1lc3NhZ2UgPSAnVGhlcmUgYXJlICcrIGRhdGEubnVtVXNlcnMrICcgcGxheWVycyBpbiB0aGUgbG9iYnknXG4gIH1cbiAgYWRkTWVzc2FnZShtZXNzYWdlKVxufVxuIl19
