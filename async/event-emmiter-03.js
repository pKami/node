var events = require('events');

var channel = new events.EventEmitter();

channel.on('join', function() {
  console.log("Welcome!");
});

// trigger the 'join' event

channel.emit('join');
