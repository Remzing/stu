const EventEmitter = require('events')
class EE extends EventEmitter { }
const yy = new EE()

yy.on('event', () => console.log('粗大事啦'))
setTimeout(() => console.log('0 毫秒后到期的定时器回调'), 0)
setTimeout(() => console.log('100 毫秒后到期的定时器回调'), 100)
setImmediate(() => console.log('immediate 立即回调'))
process.nextTick(() => console.log('process.nextTick 的回调1'))

Promise.resolve().then(() => {
  yy.emit('event')
  process.nextTick(() => console.log('process.nextTick 的回调2'))
  // setImmediate(() => console.log('微任务中的immediate 回调'))
  console.log('promise 第一次回调')
})
  .then(() => console.log('promise 第二次回调'))


// process.nextTick 的回调1
// 粗大事啦
// promise 第一次回调
// promise 第二次回调
// process.nextTick 的回调2
// 0 毫秒后到期的定时器回调
// immediate 立即回调
// 100 毫秒后到期的定时器回调

/* process.nextTick 的回调1
粗大事啦
promise 第一次回调
promise 第二次回调
process.nextTick 的回调2
0 毫秒后到期的定时器回调
immediate 立即回调
微任务中的immediate 回调
100 毫秒后到期的定时器回调 */



// 关于Node优先级：
//! 观察者优先级
// 在每次轮训检查中，各观察者的优先级分别是：
//! idle观察者 > I/O观察者 > check观察者。
//! idle观察者：process.nextTick
//! I/O观察者：一般性的I/O回调，如网络，文件，数据库I/O等
//! check观察者：setTimeout > setImmediate

// 含义：
//! idle观察者：顾名思义，就是早已等在那里的观察者，以后会说到的process.nextTick就属于这类
//! I/O观察者：顾名思义，就是I/O相关观察者，也就是I/O的回调事件，如网络，文件，数据库I/O等
//! check观察者：顾名思义，就是需要检查的观察者，后面会说到的setTimeout/setInterval就属于这类

// 总结
//! 同步代码执行顺序优先级高于异步代码执行顺序优先级；
//! new Promise(fn)中的fn是同步执行；
//! process.nextTick() > Promise.then() > setTimeout > setImmediate;