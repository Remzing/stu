
var Pending = 'pending'
var Fulfilled = 'fulfilled'
var Rejected = 'rejected'

function MyPromise(fn) {
  this.status = Pending
  this.value = null
  this.reason = null
  var self = this

  function resolve(value) {
    this.status = Fulfilled
    this.value = value
  }
  function reject(reason) {
    this.status = Rejected
    this.reason = reason
  }

  try {
    fn(resolve, reject)
  } catch (error) {
    reject(error)
  }

}

MyPromise.prototype.then = function (fulfilledFn, rejectedFn) {
  var self = this
  let promise2 = new MyPromise(function () {
    var realFulfilledFn = fulfilledFn
    if (typeof fulfilledFn !== 'function') {
      realFulfilledFn = function (value) {
        return value
      }
    }
    var realRejectedFn = rejectedFn
    if (typeof rejectedFn !== 'function') {
      realRejectedFn = function (reason) {
        return reason
      }
    }
    if (this.status === Fulfilled) {
      realFulfilledFn(this.value)
    }
    if (this.status === Rejected) {
      realRejectedFn(this.reason)
    }
    if (this.status === Pending) {
      this.lan
    }
  })

  return promise2
}