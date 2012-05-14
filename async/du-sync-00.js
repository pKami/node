//  Asynchronous Javascript – the tale of Harry
//     http://bjouhier.wordpress.com/2011/01/09/asynchronous-javascript-the-tale-of-harry/

// process.argv.forEach(function (val, index, array) {
//   console.log(index + ':', val);
// });

var fs = require('fs');

// fs.stat(path, function(err, stats) {
//   console.dir(stats);
// });

var path = process.argv[2] || "."
// console.log('path:', path);

function du(path) {
  var total = 0;
  var stats = fs.statSync(path);

  if (stats.isFile()) {
    // console.log('file:', path);

    // total += fs.readFileSync(path).length;
    total += stats.size;
  } else if (stats.isDirectory()) {
    // console.log('directory:', path);

    var files = fs.readdirSync(path);
    for (var i = 0; i < files.length; i++) {
      total += du(path + "/" + files[i]);
    }
    console.log(path + ": " + total);
  } else {
    console.log(path + ": odd file");
  }
  return total;
}

du(path);
