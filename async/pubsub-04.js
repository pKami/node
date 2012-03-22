var events = require('events')
, net = require('net');

// escape character is '^]' == CTRL + ]

var channel = new events.EventEmitter();
channel.setMaxListeners(10);

channel.clients = {};
channel.subscriptions = {};

channel.on('join', function(id, client) {
  // console.log('id:', id)
  // console.log('client._peername:', client._peername)
  // console.dir(this);
  var welcome = "Welcome! Guests online: " + this.listeners('broadcast').length;
  client.write(welcome + "\n");

  this.clients[id] = client;
  this.subscriptions[id] = function(senderId, message) {
    if (id != senderId) {  // ignore data if it’s been broadcast by the user himself
      this.clients[id].write(message);
    };
  };

 this.on('broadcast', this.subscriptions[id]);
});

channel.on('leave', function(id) {
  channel.removeListener('broadcast', this.subscriptions[id]);
  channel.emit('broadcast', id, id + " has left the chat.\n");
});


var server = net.createServer(function (client) {
  // console.dir(client);
  var id = client.remoteAddress + ':' + client.remotePort;

  client.on('connect', function() {
    channel.emit('join', id, client);
  });

  client.on('data', function(data) {
    data = data.toString();
    channel.emit('broadcast', id, data);
  });

  client.on('close', function() {
    channel.emit('leave', id);
  });
});

server.listen(8000);
