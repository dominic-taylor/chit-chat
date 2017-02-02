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
  socket.emit('message', text.value); //needs to be sanitized for security
  text.value = '';
  e.preventDefault();
});

document.getElementById("join").addEventListener("click", function(e){
  let name = document.getElementById('n').value
  if(name.length<1){name = 'Player#'+Math.floor(Math.random() * (100 - 2 + 1)) + 2}
  socket.emit('set user name', name);
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
  console.log(JSON.stringify(data));
  addMessage(data.username+ ":  " +data.message)
})

document.getElementById('r').addEventListener('click', function () {
  var name = document.getElementById('this-player').innerHTML
  socket.emit('roll', name)
}, false)

socket.on('rolled', function (data, num) {
  addMessage(data + ' rolled a '+num)
})

socket.on('login', function (data) {
  connected = true;
  let message = 'Welcome to the Game!';
  document.getElementById('this-player').innerHTML = data.username
  addMessage(message);
  addParticipantsMessage(data);

})

socket.on('user joined', function (data) {
  addMessage(data.username+ ' joined!')
  addParticipantsMessage(data)
})

socket.on('user left', function (data) {
  addMessage(data.username+ ' left the lobby.')
  addParticipantsMessage(data)
})

function addParticipantsMessage(data) {
  let message = ''
  if(data.numUsers === 1){
    message+=' One person in game'
  }else{
    message+= ' There are '+ data.numUsers+ ' players in the lobby'
  }
  addMessage(message)
  // for (var i = 0; i < data.users.length; i++) {
  //   document.getElementById('player-list').innerHTML += '<li>'+data.users[i]
  // }
}
