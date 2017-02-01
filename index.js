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

const users = []

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('set user name', function (data) {
    if(users.indexOf(data.userName) > -1){
      io.emit('publish', {userName: 'NOTICE::', message:' Sorry, '+data.userName+' is taken'})
    }
    else{
      users.push(data.userName)
      io.emit('added user', {users:users, newPlayer:data.userName})
    }
  })

  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
  socket.on('message', function(data) {
    console.log(data.userName +' '+data.message);
    io.emit('publish', data)
  })
  socket.on('roll', function(data) {
    console.log(data.userName+' rolled');
    var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;
    io.emit('rolled', data, num)
  })

})


http.listen(3000, function () {
  console.log('listening on port:3000');
})
