(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var socket = io();
// if connected = true
// remove login div covering game board etc

document.getElementById("chatbar").addEventListener("submit", function(e) {
	let text = document.getElementById('m')
	socket.emit('message', text.value); //needs to be sanitized
	text.value = '';
	e.preventDefault();
});
document.getElementById('r').addEventListener('click', function() {
	var name = document.getElementById('this-player').innerHTML
	socket.emit('roll', name)
}, false)
document.getElementById("join").addEventListener("click", function(e) {
	let name = document.getElementById('n').value
	if (name.length < 1) {
		name = 'Player #' + Math.floor(Math.random() * (100 - 2 + 1)) + 2
	}
	socket.emit('set user name', name);
	e.preventDefault();
});
document.getElementById("leave").addEventListener("click", function(e) {
	leaveGame()
	e.preventDefault();
});
document.getElementById("findGame").addEventListener("click", function(e) {
	joinGame()
	e.preventDefault();
});
socket.on('login', function(data) {
	connected = true;
	let message = 'Welcome to Pick-up Pong!';
	document.getElementById('this-player').innerHTML = data.username
	addMessage(message);
	addParticipantsMessage(data);
})
socket.on('user joined', function(data) {
	addMessage(data.username + ' joined the lobby.')
	addParticipantsMessage(data)
})
socket.on('publish', function(data) {
	addMessage(data.username + ":  " + data.message)
})
socket.on('rolled', function(data, num) {
	addMessage(data + ' rolled a ' + num)
})
socket.on('gameCreated', function(data) {
  addMessage(data.username + ' created a Game #' + data.gameId)
	initGame(data) //get ready for other player
})

function initGame(data) {
  socket.username = data.username,
  socket.gameId = data.gameId
  console.log(socket);
  addMessage('Waiting for opponent...')
}
// add player button to board
// with listner to hear paper scissors rock choice
socket.on('updateGame', function(data) {
	console.log(socket);
	console.log(data.player + ' played: ' + data.move + '!!!');
  addMessage(data.player + ' played: ' + data.move + '!!!')
})
socket.on('user left', function(data) {
	addMessage(data.username + ' left the lobby.')
	addParticipantsMessage(data)
	connected = false;
})
socket.on('joinSuccess', function(data) {
	addMessage(data.playerTwo + ' joining Game #' + data.gameId)
  socket.game = data.game
  socket.gameId = data.gameId
  if(!socket.username){
  socket.username = data.playerTwo// this is causing the issue? 
 }
  console.log(socket);
  initJoinGame(data)
})

function initJoinGame(data) {
	let board = document.getElementById('game-board')
  let playerOnePiece = buildPlayer(data.playerOne, data.gameId, 'red')
	let playerTwoPiece = buildPlayer(data.playerTwo, data.gameId, 'blue')
	board.appendChild(playerOnePiece)
  board.appendChild(playerTwoPiece)
}

function buildPlayer(playerName, gameId, colour) {
	let div = document.createElement('div')
	div.style.width = "100px"
	div.style.height = "100px"
	div.style.background = colour
	div.style.color = 'white'
	div.style.margin = 'auto'
	div.innerHTML = playerName
	div.addEventListener("click", function(e) {
			move(e)
		})
  return div
}

function move(e) {
  console.log(e.target.innerHTML);
  console.log(socket);
  if(e.target.innerHTML != socket.username){
    return
  }
  let gameId = socket.gameId
  let move = " did a move!"
  socket.emit('player move', {
    gameId: gameId,
    move: move
  })

  console.log(socket);
  console.log("here is "+ socket.username+ "'s move");
}
	socket.on('alreadyJoined', function(data) {
		addMessage('You are in a Game, #' + data.gameId)
	})
	socket.on('leftGame', function(data) {
		addMessage('Leaving Game #' + data.gameId)
		console.log('leftgame' + socket.gameId);
	})
	socket.on('notInGame', function() {
		addMessage('You are not currently in a game')
	})
	socket.on('gameDestroyed', function(data) {
		addMessage(data.gameOwner + ' destroyed game #' + data.gameId)
	})
	socket.on('update participants', function(data) {
		let playerlist = document.getElementById('player-list')
		playerlist.innerHTML = ''
		for (var i = 0; i < data.users.length; i++) {
			playerlist.innerHTML += '<li>' + data.users[i]
		}
	})

	function joinGame() {
		socket.emit('joinGame')
	}

	function sendGame() {
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
		if (data.numUsers === 1) {
			message = 'One person in lobby.'
		} else {
			message = 'There are ' + data.numUsers + ' players in the lobby'
		}
		addMessage(message)
	}

},{}]},{},[1])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJwdWJsaWMvY2xpZW50LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJ2YXIgc29ja2V0ID0gaW8oKTtcbi8vIGlmIGNvbm5lY3RlZCA9IHRydWVcbi8vIHJlbW92ZSBsb2dpbiBkaXYgY292ZXJpbmcgZ2FtZSBib2FyZCBldGNcblxuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJjaGF0YmFyXCIpLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuY3Rpb24oZSkge1xuXHRsZXQgdGV4dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdtJylcblx0c29ja2V0LmVtaXQoJ21lc3NhZ2UnLCB0ZXh0LnZhbHVlKTsgLy9uZWVkcyB0byBiZSBzYW5pdGl6ZWRcblx0dGV4dC52YWx1ZSA9ICcnO1xuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpIHtcblx0dmFyIG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGhpcy1wbGF5ZXInKS5pbm5lckhUTUxcblx0c29ja2V0LmVtaXQoJ3JvbGwnLCBuYW1lKVxufSwgZmFsc2UpXG5kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpvaW5cIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0bGV0IG5hbWUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbicpLnZhbHVlXG5cdGlmIChuYW1lLmxlbmd0aCA8IDEpIHtcblx0XHRuYW1lID0gJ1BsYXllciAjJyArIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqICgxMDAgLSAyICsgMSkpICsgMlxuXHR9XG5cdHNvY2tldC5lbWl0KCdzZXQgdXNlciBuYW1lJywgbmFtZSk7XG5cdGUucHJldmVudERlZmF1bHQoKTtcbn0pO1xuZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsZWF2ZVwiKS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24oZSkge1xuXHRsZWF2ZUdhbWUoKVxuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmluZEdhbWVcIikuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmN0aW9uKGUpIHtcblx0am9pbkdhbWUoKVxuXHRlLnByZXZlbnREZWZhdWx0KCk7XG59KTtcbnNvY2tldC5vbignbG9naW4nLCBmdW5jdGlvbihkYXRhKSB7XG5cdGNvbm5lY3RlZCA9IHRydWU7XG5cdGxldCBtZXNzYWdlID0gJ1dlbGNvbWUgdG8gUGljay11cCBQb25nISc7XG5cdGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0aGlzLXBsYXllcicpLmlubmVySFRNTCA9IGRhdGEudXNlcm5hbWVcblx0YWRkTWVzc2FnZShtZXNzYWdlKTtcblx0YWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKTtcbn0pXG5zb2NrZXQub24oJ3VzZXIgam9pbmVkJywgZnVuY3Rpb24oZGF0YSkge1xuXHRhZGRNZXNzYWdlKGRhdGEudXNlcm5hbWUgKyAnIGpvaW5lZCB0aGUgbG9iYnkuJylcblx0YWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxufSlcbnNvY2tldC5vbigncHVibGlzaCcsIGZ1bmN0aW9uKGRhdGEpIHtcblx0YWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lICsgXCI6ICBcIiArIGRhdGEubWVzc2FnZSlcbn0pXG5zb2NrZXQub24oJ3JvbGxlZCcsIGZ1bmN0aW9uKGRhdGEsIG51bSkge1xuXHRhZGRNZXNzYWdlKGRhdGEgKyAnIHJvbGxlZCBhICcgKyBudW0pXG59KVxuc29ja2V0Lm9uKCdnYW1lQ3JlYXRlZCcsIGZ1bmN0aW9uKGRhdGEpIHtcbiAgYWRkTWVzc2FnZShkYXRhLnVzZXJuYW1lICsgJyBjcmVhdGVkIGEgR2FtZSAjJyArIGRhdGEuZ2FtZUlkKVxuXHRpbml0R2FtZShkYXRhKSAvL2dldCByZWFkeSBmb3Igb3RoZXIgcGxheWVyXG59KVxuXG5mdW5jdGlvbiBpbml0R2FtZShkYXRhKSB7XG4gIHNvY2tldC51c2VybmFtZSA9IGRhdGEudXNlcm5hbWUsXG4gIHNvY2tldC5nYW1lSWQgPSBkYXRhLmdhbWVJZFxuICBjb25zb2xlLmxvZyhzb2NrZXQpO1xuICBhZGRNZXNzYWdlKCdXYWl0aW5nIGZvciBvcHBvbmVudC4uLicpXG59XG4vLyBhZGQgcGxheWVyIGJ1dHRvbiB0byBib2FyZFxuLy8gd2l0aCBsaXN0bmVyIHRvIGhlYXIgcGFwZXIgc2Npc3NvcnMgcm9jayBjaG9pY2VcbnNvY2tldC5vbigndXBkYXRlR2FtZScsIGZ1bmN0aW9uKGRhdGEpIHtcblx0Y29uc29sZS5sb2coc29ja2V0KTtcblx0Y29uc29sZS5sb2coZGF0YS5wbGF5ZXIgKyAnIHBsYXllZDogJyArIGRhdGEubW92ZSArICchISEnKTtcbiAgYWRkTWVzc2FnZShkYXRhLnBsYXllciArICcgcGxheWVkOiAnICsgZGF0YS5tb3ZlICsgJyEhIScpXG59KVxuc29ja2V0Lm9uKCd1c2VyIGxlZnQnLCBmdW5jdGlvbihkYXRhKSB7XG5cdGFkZE1lc3NhZ2UoZGF0YS51c2VybmFtZSArICcgbGVmdCB0aGUgbG9iYnkuJylcblx0YWRkUGFydGljaXBhbnRzTWVzc2FnZShkYXRhKVxuXHRjb25uZWN0ZWQgPSBmYWxzZTtcbn0pXG5zb2NrZXQub24oJ2pvaW5TdWNjZXNzJywgZnVuY3Rpb24oZGF0YSkge1xuXHRhZGRNZXNzYWdlKGRhdGEucGxheWVyVHdvICsgJyBqb2luaW5nIEdhbWUgIycgKyBkYXRhLmdhbWVJZClcbiAgc29ja2V0LmdhbWUgPSBkYXRhLmdhbWVcbiAgc29ja2V0LmdhbWVJZCA9IGRhdGEuZ2FtZUlkXG4gIGlmKCFzb2NrZXQudXNlcm5hbWUpe1xuICBzb2NrZXQudXNlcm5hbWUgPSBkYXRhLnBsYXllclR3by8vIHRoaXMgaXMgY2F1c2luZyB0aGUgaXNzdWU/IFxuIH1cbiAgY29uc29sZS5sb2coc29ja2V0KTtcbiAgaW5pdEpvaW5HYW1lKGRhdGEpXG59KVxuXG5mdW5jdGlvbiBpbml0Sm9pbkdhbWUoZGF0YSkge1xuXHRsZXQgYm9hcmQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZS1ib2FyZCcpXG4gIGxldCBwbGF5ZXJPbmVQaWVjZSA9IGJ1aWxkUGxheWVyKGRhdGEucGxheWVyT25lLCBkYXRhLmdhbWVJZCwgJ3JlZCcpXG5cdGxldCBwbGF5ZXJUd29QaWVjZSA9IGJ1aWxkUGxheWVyKGRhdGEucGxheWVyVHdvLCBkYXRhLmdhbWVJZCwgJ2JsdWUnKVxuXHRib2FyZC5hcHBlbmRDaGlsZChwbGF5ZXJPbmVQaWVjZSlcbiAgYm9hcmQuYXBwZW5kQ2hpbGQocGxheWVyVHdvUGllY2UpXG59XG5cbmZ1bmN0aW9uIGJ1aWxkUGxheWVyKHBsYXllck5hbWUsIGdhbWVJZCwgY29sb3VyKSB7XG5cdGxldCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxuXHRkaXYuc3R5bGUud2lkdGggPSBcIjEwMHB4XCJcblx0ZGl2LnN0eWxlLmhlaWdodCA9IFwiMTAwcHhcIlxuXHRkaXYuc3R5bGUuYmFja2dyb3VuZCA9IGNvbG91clxuXHRkaXYuc3R5bGUuY29sb3IgPSAnd2hpdGUnXG5cdGRpdi5zdHlsZS5tYXJnaW4gPSAnYXV0bydcblx0ZGl2LmlubmVySFRNTCA9IHBsYXllck5hbWVcblx0ZGl2LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jdGlvbihlKSB7XG5cdFx0XHRtb3ZlKGUpXG5cdFx0fSlcbiAgcmV0dXJuIGRpdlxufVxuXG5mdW5jdGlvbiBtb3ZlKGUpIHtcbiAgY29uc29sZS5sb2coZS50YXJnZXQuaW5uZXJIVE1MKTtcbiAgY29uc29sZS5sb2coc29ja2V0KTtcbiAgaWYoZS50YXJnZXQuaW5uZXJIVE1MICE9IHNvY2tldC51c2VybmFtZSl7XG4gICAgcmV0dXJuXG4gIH1cbiAgbGV0IGdhbWVJZCA9IHNvY2tldC5nYW1lSWRcbiAgbGV0IG1vdmUgPSBcIiBkaWQgYSBtb3ZlIVwiXG4gIHNvY2tldC5lbWl0KCdwbGF5ZXIgbW92ZScsIHtcbiAgICBnYW1lSWQ6IGdhbWVJZCxcbiAgICBtb3ZlOiBtb3ZlXG4gIH0pXG5cbiAgY29uc29sZS5sb2coc29ja2V0KTtcbiAgY29uc29sZS5sb2coXCJoZXJlIGlzIFwiKyBzb2NrZXQudXNlcm5hbWUrIFwiJ3MgbW92ZVwiKTtcbn1cblx0c29ja2V0Lm9uKCdhbHJlYWR5Sm9pbmVkJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdGFkZE1lc3NhZ2UoJ1lvdSBhcmUgaW4gYSBHYW1lLCAjJyArIGRhdGEuZ2FtZUlkKVxuXHR9KVxuXHRzb2NrZXQub24oJ2xlZnRHYW1lJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdGFkZE1lc3NhZ2UoJ0xlYXZpbmcgR2FtZSAjJyArIGRhdGEuZ2FtZUlkKVxuXHRcdGNvbnNvbGUubG9nKCdsZWZ0Z2FtZScgKyBzb2NrZXQuZ2FtZUlkKTtcblx0fSlcblx0c29ja2V0Lm9uKCdub3RJbkdhbWUnLCBmdW5jdGlvbigpIHtcblx0XHRhZGRNZXNzYWdlKCdZb3UgYXJlIG5vdCBjdXJyZW50bHkgaW4gYSBnYW1lJylcblx0fSlcblx0c29ja2V0Lm9uKCdnYW1lRGVzdHJveWVkJywgZnVuY3Rpb24oZGF0YSkge1xuXHRcdGFkZE1lc3NhZ2UoZGF0YS5nYW1lT3duZXIgKyAnIGRlc3Ryb3llZCBnYW1lICMnICsgZGF0YS5nYW1lSWQpXG5cdH0pXG5cdHNvY2tldC5vbigndXBkYXRlIHBhcnRpY2lwYW50cycsIGZ1bmN0aW9uKGRhdGEpIHtcblx0XHRsZXQgcGxheWVybGlzdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwbGF5ZXItbGlzdCcpXG5cdFx0cGxheWVybGlzdC5pbm5lckhUTUwgPSAnJ1xuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgZGF0YS51c2Vycy5sZW5ndGg7IGkrKykge1xuXHRcdFx0cGxheWVybGlzdC5pbm5lckhUTUwgKz0gJzxsaT4nICsgZGF0YS51c2Vyc1tpXVxuXHRcdH1cblx0fSlcblxuXHRmdW5jdGlvbiBqb2luR2FtZSgpIHtcblx0XHRzb2NrZXQuZW1pdCgnam9pbkdhbWUnKVxuXHR9XG5cblx0ZnVuY3Rpb24gc2VuZEdhbWUoKSB7XG5cdFx0c29ja2V0LmVtaXQoJ3JlcXVlc3RHYW1lJyk7XG5cdH07XG5cblx0ZnVuY3Rpb24gbGVhdmVHYW1lKCkge1xuXHRcdHNvY2tldC5lbWl0KCdsZWF2ZUdhbWUnKTtcblx0fVxuXG5cdGZ1bmN0aW9uIGFkZE1lc3NhZ2UobWVzc2FnZSkge1xuXHRcdHZhciBsaSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaVwiKTtcblx0XHRsaS5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShtZXNzYWdlKSlcblx0XHRkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVzc2FnZXMnKS5hcHBlbmRDaGlsZChsaSlcblx0XHR2YXIgYm94ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lc3NhZ2VzJyk7XG5cdFx0Ym94LnNjcm9sbFRvcCA9IGJveC5zY3JvbGxIZWlnaHQ7XG5cdH1cblxuXHRmdW5jdGlvbiBhZGRQYXJ0aWNpcGFudHNNZXNzYWdlKGRhdGEpIHtcblx0XHRsZXQgbWVzc2FnZSA9ICcnXG5cdFx0aWYgKGRhdGEubnVtVXNlcnMgPT09IDEpIHtcblx0XHRcdG1lc3NhZ2UgPSAnT25lIHBlcnNvbiBpbiBsb2JieS4nXG5cdFx0fSBlbHNlIHtcblx0XHRcdG1lc3NhZ2UgPSAnVGhlcmUgYXJlICcgKyBkYXRhLm51bVVzZXJzICsgJyBwbGF5ZXJzIGluIHRoZSBsb2JieSdcblx0XHR9XG5cdFx0YWRkTWVzc2FnZShtZXNzYWdlKVxuXHR9XG4iXX0=
