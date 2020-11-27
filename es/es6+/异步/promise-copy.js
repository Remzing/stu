
//根据规范 Promise有三种状态 
// pending fulfilled rejected
// 初始状态为pending， 调用resolve之后状态改为fullfilled，调用reject状态改为rejected
var Pending = "pending";
var Fulfilled = "fulfilled"
var Rejected = "rejected"

function MyPromise(fn) {
  // 状态
  this.status = Pending
  // 成功返回值
  this.value = null
  // 失败原因
  this.reason = null
  // 存一下this,以便resolve和reject里面访问
  var that = this;
  // 构造函数里面添加两个数组存储成功和失败  发布订阅模式  
  this.onFulfilledCallbacks = []
  this.onRejectedCallbacks = []

  // 成功调用的函数resolve
  function resolve(value) {
    if (that.status === Pending) {
      that.status = Fulfilled
      that.value = value
      // resolve里面将所有成功的回调拿出来执行
      that.onFulfilledCallbacks.forEach(callback => {
        callback(that.value)
      });
    }
  }
  // 失败调用的函数reject
  function reject(reason) {
    if (that.status === Pending) {
      that.status = Rejected
      that.reason = reason
      // resolve里面将所有成功的回调拿出来执行
      that.onRejectedCallbacks.forEach(callback => {
        callback(that.reason)
      });
    }
  }
  // 调用传进来的函数
  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}
/* 那then方法里面应该干什么呢，其实规范也告诉我们了，先检查onFulfilled和onRejected是不是函数，如果不是函数就忽略他们，
  所谓“忽略”并不是什么都不干，对于onFulfilled来说“忽略”就是将value原封不动的返回，
  对于onRejected来说就是返回reason，onRejected因为是错误分支，我们返回reason应该throw一个Error:
 */
MyPromise.prototype.then = function (onFulfilled, onRejected) {
  var that = this
  var realOnFulfilled = onFulfilled
  if (typeof realOnFulfilled !== 'function') {
    realOnFulfilled = function (value) {
      return value
    }
  }
  var realOnRejected = onRejected
  if (typeof realOnRejected !== 'function') {
    realOnRejected = function (reason) {
      throw reason
    }
  }


  if (this.status === Fulfilled) {
    let promise2 = MyPromise(function (resolve, reject) {
      /* 在规范中还有一条：onFulfilled 和 onRejected 只有在执行环境堆栈仅包含平台代码时才可被调用。这一条的意思是实践中要确保 onFulfilled 和 onRejected 方法异步执行，
      且应该在 then 方法被调用的那一轮事件循环之后的新执行栈中执行。所以在我们执行onFulfilled 和 onRejected的时候都应该包到setTimeout里面去。*/
      // 这里加setTimeout
      setTimeout(function () {
        try {
          if (typeof onFulfilled !== 'function') {
            resolve(that.value)
          } else {
            var x = realOnFulfilled(that.value);
            resolvePromise(promise2, x, resolve, reject);   // 调用Promise 解决过程
          }
        } catch (error) {
          reject(error)
        }
      })

    })
    return promise2
  }
  if (this.status === Rejected) {
    let promise2 = MyPromise(function (resolve, reject) {
      // 这里加setTimeout
      setTimeout(function () {
        try {
          if (typeof onRejected !== 'function') {
            reject(that.reason);
          } else {
            var x = realOnRejected(that.reason);
            resolvePromise(promise2, x, resolve, reject);
          }
        } catch (error) {
          reject(error)
        }
      })
    })
    return promise2
  }
  // 如果还是PENDING状态，将回调保存下来 收集
  if (this.status === Pending) {
    var promise2 = MyPromise(function (resolve, reject) {

      that.onFulfilledCallbacks.push(function () {
        // 这里加setTimeout
        setTimeout(function () {
          try {
            if (typeof onFulfilled !== 'function') {
              resolve(that.value);
            } else {
              var x = realOnFulfilled(that.value);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        });
      })
      that.onRejectedCallbacks.push(function () {
        // 这里加setTimeout
        setTimeout(function () {
          try {
            if (typeof onRejected !== 'function') {
              reject(that.reason);
            } else {
              var x = realOnRejected(that.reason);
              resolvePromise(promise2, x, resolve, reject);
            }
          } catch (error) {
            reject(error);
          }
        }, 0)
      })
    })
    return promise2
  }
}
function resolvePromise(promise, x, resolve, reject) {
  // 1.如果 promise 和 x 指向同一对象，以 TypeError 为据因拒绝执行 promise
  // 这是为了防止死循环
  if (promise === x) {
    return reject(new TypeError('The promise and the return value are the same'));
  }

  if (x instanceof MyPromise) {
    // 2.如果 x 为 Promise实例 ，则使 promise 接受 x 的状态
    // 也就是继续执行x，如果执行的时候拿到一个y，还要继续解析y
    // 这个if跟下面判断then然后拿到执行其实重复了，可有可无
    x.then(function (y) {
      resolvePromise(promise, y, resolve, reject);
    }, reject);
  }
  // 3.如果 x 为对象或者函数
  else if (typeof x === 'object' || typeof x === 'function') {
    // 这个坑是跑测试的时候发现的，如果x是null，应该直接resolve
    if (x === null) {
      return resolve(x);
    }

    try {
      // 把 x.then 赋值给 then 
      var then = x.then;
    } catch (error) {
      // 如果取 x.then 的值时抛出错误 e ，则以 e 为据因拒绝 promise
      return reject(error);
    }

    // 如果 then 是函数
    if (typeof then === 'function') {
      var called = false;
      // 将 x 作为函数的作用域 this 调用之
      // 传递两个回调函数作为参数，第一个参数叫做 resolvePromise ，第二个参数叫做 rejectPromise
      // 名字重名了，我直接用匿名函数了
      try {
        then.call(
          x,
          // 如果 resolvePromise 以值 y 为参数被调用，则运行 [[Resolve]](promise, y)
          function (y) {
            // 如果 resolvePromise 和 rejectPromise 均被调用，
            // 或者被同一参数调用了多次，则优先采用首次调用并忽略剩下的调用
            // 实现这条需要前面加一个变量called
            if (called) return;
            called = true;
            resolvePromise(promise, y, resolve, reject);
          },
          // 如果 rejectPromise 以据因 r 为参数被调用，则以据因 r 拒绝 promise
          function (r) {
            if (called) return;
            called = true;
            reject(r);
          });
      } catch (error) {
        // 如果调用 then 方法抛出了异常 e：
        // 如果 resolvePromise 或 rejectPromise 已经被调用，则忽略之
        if (called) return;

        // 否则以 e 为据因拒绝 promise
        reject(error);
      }
    } else {
      // 如果 then 不是函数，以 x 为参数执行 promise
      resolve(x);
    }
  } else {
    // 4.如果 x 不为对象或者函数，以 x 为参数执行 promise
    resolve(x);
  }
}


module.exports = MyPromise