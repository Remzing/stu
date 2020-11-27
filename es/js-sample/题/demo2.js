// 题：将一个setTimeout转换为Promise
// function sleep(ms) {

// }
// sleep(1000).then(()=>{...}) // 延迟1000毫秒后执行这个回调函数

/* function sleep(ms) {
  let then = function (fn) {
    setTimeout(() => {
      fn()
      return then
    }, ms);
  }
  return {
    then
  }
} */


// 实现一个自动生成ID的函数，每次调用ID值 加1 
/* function getID() {
  let autoAdd = function (id = 0) {
    return id++
  }
  autoAdd.toString = function () {
    console.log(this.id)
    return this.id
  }
  return autoAdd
}
getID()() //0
getID()() //1
getID()() //2 */

// 实现一个重复执行函数的函数，返回的函数可以重复执行 fn 函数 times 次，每次间隔 wait 秒
function repeat(fn, times, wait) {
  for (let i = 1; i <= times; i++) {
    setTimeout(() => {
      fn()
    }, wait * i);
  }
}
repeat(() => { console.log(42) }, 5, 1000) // 每个1000毫秒打印一个42，一共打印5次