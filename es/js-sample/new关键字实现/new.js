// new 的作用
// 1.创建一个新对象obj
// 2.把obj的__proto__指向Dog.prototype 实现继承
// 3.执行构造函数，传递参数，改变this指向 Dog.call(obj, ...args)
// 最后把obj赋值给 内部属性

function _new1(fn, ...arg) {
  var obj = Object.create(fn.prototype)
  var ret = fn.apply(obj, arg)
  return ret instanceof Object ? ret : obj
}


// 实现一个new
var Dog = function (name) {
  this.name = name
}
Dog.prototype.bark = function () {
  console.log('wangwang')
}
Dog.prototype.sayName = function () {
  console.log('my name is ' + this.name)
}
let sanmao = new Dog('三毛')
sanmao.sayName()
sanmao.bark()
// new 的作用
// 创建一个新对象obj
// 把obj的__proto__指向Dog.prototype 实现继承
// 执行构造函数，传递参数，改变this指向 Dog.call(obj, ...args)
// 最后把obj赋值给sanmao
var _new = function () {
  let constructor = Array.prototype.shift.call(arguments)
  let args = arguments
  const obj = new Object()
  obj.__proto__ = constructor.prototype
  constructor.call(obj, ...args)
  return obj
}
var simao = _new(Dog, 'simao')
simao.bark()
simao.sayName()
console.log(simao instanceof Dog) // true