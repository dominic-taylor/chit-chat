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
