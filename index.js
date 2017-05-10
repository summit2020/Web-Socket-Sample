var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
	socket.join('some room');
  socket.on('chat message', function(msg){
	 console.log(msg); 
	 //send messeage all sockets except current socket request
	 socket.to('some room').emit('chat message', msg);
    //io.emit('chat message', msg);
	//socket.broadcast.emit(msg);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});


// sending to sender-client only
//socket.emit('message', "this is a test");

// sending to all clients, include sender
//io.emit('message', "this is a test");

// sending to all clients except sender
//socket.broadcast.emit('message', "this is a test");

// sending to all clients in 'game' room(channel) except sender
//socket.broadcast.to('game').emit('message', 'nice game');

// sending to all clients in 'game' room(channel), include sender
//io.in('game').emit('message', 'cool game');

// sending to sender client, only if they are in 'game' room(channel)
//socket.to('game').emit('message', 'enjoy the game');

// sending to all clients in namespace 'myNamespace', include sender
//io.of('myNamespace').emit('message', 'gg');

// sending to individual socketid
//socket.broadcast.to(socketid).emit('message', 'for your eyes only');