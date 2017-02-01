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
