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
  socket.on('joinGame', function () {
    console.log(socket.username + "wants to join a game");

    var alreadyInGame = false;

    for(var i = 0; i < gameCollection.totalGameCount; i++){
        var plyr1Tmp = gameCollection.gameList[i]['gameObject']['playerOne'];
        var plyr2Tmp = gameCollection.gameList[i]['gameObject']['playerTwo'];
        if (plyr1Tmp == socket.username || plyr2Tmp == socket.username){

            console.log(socket.username + " already has a Game!");

            socket.emit('alreadyJoined', {
            gameId: gameCollection.gameList[i]['gameObject']['id']
            });
        }
    }
    if (alreadyInGame == false){
      console.log("Add them into a Game!!!")
    }
  });
  // });


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
      console.log(JSON.stringify(gameCollection.gameList));

      let noGamesFound = true;
      for (var i = 0; i < gameCollection.totalGameCount; i++) {
        var tempName = gameCollection.gameList[i]['gameObject']['playerOne']
        if(tempName === socket.username){
          noGamesFound = false;
          console.log('This user already has a Game');
          socket.emit('alreadyJoined', {
            gameId: gameCollection.gameList[i]['gameObject']['id']
          })
        }
      }
      if(noGamesFound === true){
        buildGame(socket)
      }
  })

function buildGame(socket) {
  let gameObject = {}

  gameObject.id = (Math.random()+1).toString(36).slice(2, 18);
  gameObject.playerOne = socket.username
  gameCollection.totalGameCount++;
  gameCollection.gameList.push({gameObject});

  console.log('Game #'+gameId+' created by '+socket.username);

  io.emit('gameCreated', {
    username: socket.username,
    gameId: gameId
  })

}
  socket.on('roll', function(data) {
    console.log(data+' rolled');
    var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
    io.emit('rolled', data, num)
  })

})

function joinGame(username, game) {
  console.log(socket.username + " wants to join a game");

    var alreadyInGame = false;

    for(var i = 0; i < gameCollection.totalGameCount; i++){
        var plyr1Tmp = gameCollection.gameList[i]['gameObject']['playerOne'];
        var plyr2Tmp = gameCollection.gameList[i]['gameObject']['playerTwo'];
        if (plyr1Tmp == socket.username || plyr2Tmp == socket.username){
        alreadyInGame = true;

        console.log(socket.username + " already has a Game!");

        socket.emit('alreadyJoined', {
        gameId: gameCollection.gameList[i]['gameObject']['id']
        });

    }
}
    if (alreadyInGame == false){
        gameSeeker(socket);

    }
}

function gameSeeker (socket) {
    ++loopLimit;
    if (( gameCollection.totalGameCount == 0) || (loopLimit >= 20)) {
        buildGame(socket);
        loopLimit = 0;

    }
     else {
        var rndPick = Math.floor(Math.random() * gameCollection.totalGameCount);
        if (gameCollection.gameList[rndPick]['gameObject']['playerTwo'] == null){
            gameCollection.gameList[rndPick]['gameObject']['playerTwo'] = socket.username;
            socket.emit('joinSuccess', {
                gameId: gameCollection.gameList[rndPick]['gameObject']['id'] });

            console.log( socket.username + " has been added to: " + gameCollection.gameList[rndPick]['gameObject']['id']);

        }
        else {
            gameSeeker(socket);
        }
        }
}
http.listen(port, function () {
  console.log('listening on port:%d', port);
})
