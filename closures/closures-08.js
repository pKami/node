// Partially applying arguments to a native function (using the code from Listing 3-10).

var assert = require('assert');

Function.prototype.method = function (name, func) {
  if (!this.prototype[name]) {
    this.prototype[name] = func;
  }
};

String.method('csv', function() {
  return this.split(/,\s*/);
});

var results = "John, Resig, Boston".csv();

console.log(results);

assert( results[1] == "Resig", "The text values were split properly" );
