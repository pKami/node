var net = require('net');

var server = net.createServer(function(socket) {
  socket.on('data', function(data) {
    socket.write(data);
  });
});

server.listen(8000);

// terminal_1$  node socket-01.js
// terminal_2$  telnet localhost 8000
