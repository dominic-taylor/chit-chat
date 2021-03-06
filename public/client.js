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
