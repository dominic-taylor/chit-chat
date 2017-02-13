'use strict'
const express = require('express');
const path = require('path');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
// Define the port to run on
app.set('port', port);
app.use(express.static(path.join(__dirname, 'public')));
app.get('/', function(req, res) {
	res.status(200).send('ok')
	res.sendFile(path.join(__dirname, 'public/index.html'))
})
const users = []
let numUsers = 0;
let gameCollection = new function() {
	this.totalGameCount = 0,
		this.gameList = []
}
io.on('connection', function(socket) {
		let addedUser = false;
		console.log('a user connected');

    socket.on('set user name', function(username) {
      if (addedUser) return;
      socket.username = username
      numUsers++
      addedUser = true;
      users.push(socket.username)
      socket.emit('login', {
        username: socket.username,
        numUsers: numUsers,
      });

      socket.broadcast.emit('user joined', {
        username: socket.username,
        numUsers: numUsers,
      })

      io.emit('update participants', {
        users: users
      })
    })

		socket.on('message', function(data) {
			io.emit('publish', {
				username: socket.username,
				message: data
			})
		})

		socket.on('joinGame', function() {
			console.log(socket.username + "wants to join a game");
			if(!socket.username) {
				socket.emit('publish', {
					username: 'NOTE: ',
					message: 'You must join the lobby to find a game.'
				})
				return
			}
			let alreadyInGame = false;
			for (var i = 0; i < gameCollection.totalGameCount; i++) {
				var plyr1Tmp = gameCollection.gameList[i]['gameObject']['playerOne'];
				var plyr2Tmp = gameCollection.gameList[i]['gameObject']['playerTwo'];
				if (plyr1Tmp == socket.username || plyr2Tmp == socket.username) {
					alreadyInGame = true;
					console.log(socket.username + " already has a Game!");
					socket.emit('alreadyJoined', {
						gameId: gameCollection.gameList[i]['gameObject']['id']
					});
				}
			}
			if (alreadyInGame == false) {
				gameSeeker(socket, 0)
				console.log("Seeking a Game!!!")
			}
		});
		socket.on('disconnect', function() {
			if (addedUser) {
				--numUsers;
				//find/remove this user from user []
				console.log('user disconnected');
				socket.broadcast.emit('user left', {
					username: socket.username,
					numUsers: numUsers
				})
			}
		})
		socket.on('requestGame', function() {
			let noGamesFound = true;
			for (var i = 0; i < gameCollection.totalGameCount; i++) {
				// var tempName = gameCollection.gameList[i]['gameObject']['playerOne']
				if (gameCollection.gameList[i]['gameObject']['playerOne'] === socket.username) {
					noGamesFound = false;
					socket.emit('alreadyJoined', {
						gameId: gameCollection.gameList[i]['gameObject']['id']
					})
				}
			}
			if (noGamesFound === true) {
				buildGame(socket)
			}
		})
		socket.on('roll', function(data) {
			console.log(data + ' rolled');
			var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
			io.emit('rolled', data, num)
		})
		socket.on('leaveGame', function() {
			if (gameCollection.totalGameCount == 0) {
				socket.emit('notInGame')
			} else {
				killGame(socket)
			}
		})

		socket.on('player move', function (data) {
			console.log(socket.username + ' In game '+data.gameId+' and '+data.move);
			// make playes join a room when joining/making a game
			// then emit message only to that room 
			let gameRoom =  data.gameId
			io.to(gameRoom).emit('updateGame', {
					player: socket.username,
					move: data.move
			})
			//socket.broadcast.to('the-unique-room-name').emit('update', data)
		})

}) ////ioemit connect

	function buildGame(socket) {
		let gameObject = {}
		gameObject.id = (Math.random() + 1).toString(36).slice(2, 18);
		gameObject.playerOne = socket.username
		gameCollection.totalGameCount++;
		gameCollection.gameList.push({
			gameObject
		});
		console.log('Game #' + gameObject.id + ' created by ' + socket.username);
		socket.gameId = gameObject.id
		let gameRoom = gameObject.id
		socket.join(gameRoom)
		io.to(gameRoom).emit('gameCreated', {
					game: gameObject,
					username: socket.username,
					gameId: gameObject.id

		})
	}
  function killGame(socket) {
  	let notInGame = true;
  	for (var i = 0; i < gameCollection.totalGameCount; i++) {
  		var gameId = gameCollection.gameList[i]['gameObject']['id']
  		var player1temp = gameCollection.gameList[i]['gameObject']['playerOne']
  		var player2temp = gameCollection.gameList[i]['gameObject']['playerTwo']
			console.log('is player one and two in this? ', gameCollection.gameList[i]);
  		if (player1temp == socket.username || player2temp == socket.username) {
  			--gameCollection.totalGameCount;
  			gameCollection.gameList.splice(i, 1)
  			io.emit('leftGame', {
  				gameId: gameId
  			})
  			io.emit('gameDestroyed', {
  				gameId: gameId,
  				gameOwner: socket.username
  			})
  			notInGame = false;
				console.log('is player one and two in this? ', gameCollection.gameList[i]);
  		}
  	}
  	if (notInGame == true) {
  		socket.emit('notInGame')
  	}
  }
function gameSeeker(socket, loopLimit) {
	if ((gameCollection.totalGameCount == 0) || (loopLimit >= 20)) {
		buildGame(socket);
		loopLimit = 0;
	} else {
		var rndPick = Math.floor(Math.random() * gameCollection.totalGameCount);
		if (gameCollection.gameList[rndPick]['gameObject']['playerTwo'] == null) {
			gameCollection.gameList[rndPick]['gameObject']['playerTwo'] = socket.username;
			socket.gameId = gameCollection.gameList[rndPick]['gameObject']['id']
			//add scoket.username to room name gameId
			let gameRoom = gameCollection.gameList[rndPick]['gameObject']['id']
			socket.join(gameRoom)
			io.to(gameRoom).emit('joinSuccess', {
				game: gameCollection.gameList[rndPick]['gameObject'],
				playerOne: gameCollection.gameList[rndPick]['gameObject']['playerOne'],
				playerTwo: gameCollection.gameList[rndPick]['gameObject']['playerTwo'],
				gameId: gameCollection.gameList[rndPick]['gameObject']['id']
			});
			console.log(socket.username + " has been added to: " + gameCollection.gameList[rndPick]['gameObject']['id']);
		} else {
      loopLimit++
			gameSeeker(socket, loopLimit);
		}
	}
}

http.listen(port, function() {
	console.log('listening on port:%d', port);
})
