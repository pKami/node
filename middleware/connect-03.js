var connect = require('connect')
, http = require('http');

// curl localhost:3000/short.html

var app = connect()
  .use(echoMiddleware)
  .use(connect.static(__dirname + '/public'));

http.Server(app)
  .listen(3000);

console.log('server started on port 3000');

function echoMiddleware(req, res, next) {
  console.dir(res);
  next();
};
