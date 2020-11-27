Promise._resolve = (fn) => {
  if (fn instanceof Promise) {
    return fn
  }
  let promiseSet = new Promise((resolve, reject) => {
    resolve(fn)
  })
  return promiseSet
}

Promise._reject = (reason) => {
  return new Promise((resolve, reject) => {
    reject(reason)
  })
}

Promise._all = (promiseList) => {
  let promiseSet = new Promise((resolve, reject) => {
    var length = promiseList.length
    var result = []
    var count = 0
    if (length === 0) {
      return resolve(result)
    }
    promiseList.forEach((promiseItem, index) => {
      Promise._resolve(promiseItem).then((res) => {
        count++
        result[index] = res
        if (count === length) {
          resolve(result)
        }
      }, (rej) => {
        reject(rej)
      })
    });
  })
  return promiseSet
}

Promise._race = (promiseList) => {
  let promiseSet = new Promise((resolve, reject) => {

    if (!promiseList.length) {
      return resolve()
    } else {
      for (let i = 0; i < promiseList.length; i++) {
        Promise.resolve(promiseList[i]).then(function (value) {
          return resolve(value)
        }, function (reason) {
          return reject(reason)
        })
      }
    }
  })
  return promiseSet
}