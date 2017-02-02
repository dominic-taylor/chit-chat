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

app.get('/', function (req, res) {
  res.status(200).send('ok')
  res.sendFile(path.join(__dirname, 'public/index.html'))
})

const users = []

//1) When connection is made, assign uid to client
//2) Use uid as key in user object in users arr i.e
// #890890{userName: PlayerJO}
//

let gameCollection = new function () {
  this.totalGameCount = 0,
  this.gameList = {}
}

let numUsers = 0;

io.on('connection', function (socket) {
  let addedUser = false;

  console.log('a user connected');

  socket.on('message', function(data) {

    io.emit('publish', {
      username: socket.username,
      message: data
    })
  })

  socket.on('set user name', function (username) {
    if(addedUser) return;
    socket.username = username
    numUsers++
    addedUser = true;
    socket.emit('login', {
      username: socket.username,
      numUsers: numUsers
    });

    socket.broadcast.emit('user joined', {
      username: socket.username,
      numUsers: numUsers
    })
  })

  socket.on('disconnect', function () {
    if(addedUser){
      --numUsers;

      console.log('user disconnected');
      socket.broadcast.emit('user left', {
        username: socket.username,
        numUsers: numUsers
      })
    }
  })


  socket.on('makeGame', function () {
      let gameId = (Math.random()+1).toString(36).slice(2, 18);
      console.log('Game #'+gameId+' created by '+socket.username);

      gameCollection.gameList.gameId = gameId
      gameCollection.gameList.gameId.playerOne = socket.username
      gameCollection.gameList.gameId.open = true
      gameCollection.totalGameCount++;

      io.emit('gameCreated', {
        username: socket.username,
        gameId: gameId
      })


  })

  socket.on('roll', function(data) {
    console.log(data+' rolled');
    var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
    io.emit('rolled', data, num)
  })

})

function joinGame(username, game) {
  if(game.player2 !== null){
    game.player2 = username
  }else{
    console.log('game #'+game.id+" alread y has max players");
  }
}
http.listen(port, function () {
  console.log('listening on port:%d', port);
})
