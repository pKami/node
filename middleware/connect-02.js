// A short guide to Connect Middleware
//   http://stephensugden.com/middleware_guide/

// Understanding Connect and Middleware
//   http://project70.com/nodejs/understanding-connect-and-middleware/

var connect = require('connect');

// each middleware can decide to respond:
// * by calling methods on the response object, and/or
// * pass the request off to the next layer in the stack by calling next()

// a middleware that simply interrupts every request

function worseThanUselessMiddleware(req, res, next) {
//  next();  // no-op middleware
  next("Hey are you busy?");  // signal an error by passing message as the first argument
};

// when a middleware returns an error like above, all subsequent
// middleware will be skipped until connect can find an error handler

var app = connect()
  .use('/attention', worseThanUselessMiddleware)  // the first argument is optional
  .use(consoleErrorNotifier({to: 'wb@me.pl'}))    // error handler
  .use('/', function(req, res, next) {
    res.end('I’m out of coffee!');
  });

var http = require('http');

http.Server(app)
  .listen(3000);

// var app = connect.createServer();
// app.use(worseThanUselessMiddleware);
// app.listen(3000);

console.log('server started on port 3000');

// error message handler

function consoleErrorNotifier(generic_opts) {
  // error handler: the arity middleware function must be 4
  return function notify(err, req, res, next) {
    if (err) {
      var opts = {
        error: err.constructor.name,
        stack: err.stack,
      };
      for (var i in opts) {
          generic_opts[i] = opts[i];
      };
      console.dir(generic_opts);
    }
    next();
  };
};
