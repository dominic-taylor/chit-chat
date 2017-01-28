const app = require('express')();
const http = require('http').Server(app);
const io = require('socket.io')(http);

app.get('/', function (req, res) {
  res.sendFile(__dirname+'/index.html')
})

io.on('connection', function (socket) {
  console.log('a user connected');
  socket.on('disconnect', function () {
    console.log('user disconnected');
  })
  socket.on('chat message', function(msg) {
    io.emit('chat message', msg)
    console.log('message: '+msg);
  })
  socket.on('roll', function() {

    var num = Math.floor(Math.random() * (12 - 2 + 1)) + 2;

    io.emit('roll', num)
    console.log('got a : ', num);
  })

})


http.listen(3000, function () {
  console.log('listening on *:3000');
})
