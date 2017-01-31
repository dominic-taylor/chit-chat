var express = require('express');
var path = require('path');
var app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

// Define the port to run on
app.set('port', 3000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function (req, res) {
  res.status(200).send('ok')
  res.sendFile(path.join(__dirname, 'public/index.html'))
})


io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
  socket.on('message', function(player) {
    console.log(player.userName +' '+player.message);
    io.emit('publish', player)
  })
  socket.on('roll', function(player) {
    var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
    io.emit('rolled', player, num)
  })

})


http.listen(3000, function () {
  console.log('listening on port:3000');
})
