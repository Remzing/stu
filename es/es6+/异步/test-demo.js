var request = require("request");
var MyPromise = require('./promise-copy');

var promise1 = new MyPromise((resolve, reject) => {
  request('https://www.baidu.com', function (error, response) {
    console.log('qwe', error, response.statusCode)
    if (!error && response.statusCode == 200) {
      console.log('success-reso')
      resolve('request1 success');
    } else {
      reject('request1 fail')
    }
  });
});

promise1.then(function (value) {
  console.log('qwe-then', value);
});

// var promise2 = new MyPromise((resolve, reject) => {
//   request('https://www.baidu.com', function (error, response) {
//     if (!error && response.statusCode == 200) {
//       reject('request2 failed');
//     }
//   });
// });

// promise2.then(function (value) {
//   console.log(value);
// }, function (reason) {
//   console.log(reason);
// });
