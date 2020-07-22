/**
 * js并发限制
 * 并发限制原理：
 * 所有请求作为队列存储，每次放入限制并发的个数n，每完成一个请求马上加入新的请求，实现并发限制为n
 **/
function reqLimit(list, limit, asyncHandle) {
  let recursion = (arr) => {
    return asyncHandle(arr.shift())
      .then(() => {
        if (arr.length !== 0) return recursion(arr)
        else return "finish"
      })
  }
  let listCopy = [].concat(list)
  let asyncList = [] //正在进行的异步操作
  while (limit--) {
    asyncList.push(recursion(listCopy))
  }
  return Promise.all(asyncList)
}
var count = 0
var a = [1, 2, 3, 123, 4, 5, 6, 7, 456]
reqLimit(a, 3, (curItem) => {
  return new Promise(rej => {
    count++
    setTimeout(() => {
      console.log(curItem, "当前并发", count--)
      rej()
    },
      // curItem * 1000);
      Math.random() * 3000);
  })
}).then(res => {
  console.log("finish-state: ", res)
})

// reqLimit(a, 3, (curItem) => {
//   return new Promise((resolve, reject) => {
//     count++
//     setTimeout(() => {
//       console.log(curItem, "当前并发", count--)
//       // 错误触发 抛出异常 停止
//       if (curItem > 4) {
//         reject("error happen")
//       }
//       resolve()
//     },
//       // curItem * 1000);
//       Math.random() * 3000);
//   })
// })
//   .then(res => {
//     console.log("finish-state: ", res)
//   })