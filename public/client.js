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
