// The Node Beginner Book
//   http://www.nodebeginner.org/

var http = require('http');

var server = http.createServer();

server.on('request', function (req, res) {
  console.dir(req.headers);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.write('hello world\n');
  res.end('witaj świecie\n');
});

server.listen(1337, '127.0.0.1');

console.log('Server running at http://127.0.0.1:1337/');

// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/plain'});
//   res.write('hello world\n');
//   res.end('Hello World\n');
// }).listen(1337, '127.0.0.1');
