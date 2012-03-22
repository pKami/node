// Partially applying arguments to a native function (using the code from Listing 3-10).

var assert = require('assert');

Function.prototype.curry = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    return fn.apply(this, args.concat(Array.prototype.slice.call(arguments)));
  };
};

Function.prototype.partial = function() {
  var fn = this, args = Array.prototype.slice.call(arguments);
  return function() {
    var arg = 0;
    for (var i = 0; i < args.length && arg < arguments.length; i++) {
      if (args[i] === undefined) {
        args[i] = arguments[arg++];
      }
    }
    return fn.apply(this, args);
  };
};

String.prototype.csv = String.prototype.split.partial(/,\s*/);

var results = ("John, Resig, Boston").csv();
assert( results[0] == "John" && results[1] == "Resig", "The text values were split properly" );
