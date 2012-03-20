// someAsyncFunction('data', function(text) {
//   anotherAsyncFunction(text, function(text) {
//     yetAnotherAsyncFunction(text, function(text) {
//       console.log(text);
//     });
//   });
// });

function handleResult(text) {
  console.log(text);
};

function innerLogic(text) {
  yetAnotherAsyncFunction(text, handleResult);
};

function outerLogic(text) {
  anotherAsyncFunction(text, innerLogic);
};

// ----

function someAsyncFunction(s, callback) {
  callback('hello ' + s);
};

function anotherAsyncFunction(text, callback) {
  callback('outer ' + text);
};

function yetAnotherAsyncFunction(text, callback) {
  callback('inner ' + text);
};

// ----

someAsyncFunction('data', outerLogic);
