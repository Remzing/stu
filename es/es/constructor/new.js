// new 运算符 实现原理
/**
 * 当代码 new Foo(...) 执行时，会发生以下事情：

  1一个继承自 Foo.prototype 的新对象被创建。
  2使用指定的参数调用构造函数 Foo ，并将 this 绑定到新创建的对象。new Foo 等同于 new Foo()，也就是没有指定参数列表，Foo 不带任何参数调用的情况。
  3由构造函数返回的对象就是 new 表达式的结果。如果构造函数没有显式返回一个对象，则使用步骤1创建的对象。
 */
function create() {
  var obj = {}
  // 获得构造函数，arguments中去除第一个参数
  var Con = [].shift.call(arguments)
  // 链接到原型，obj 可以访问到构造函数原型中的属性
  obj.__proto__ = Con.prototype;
  // 绑定 this 实现继承，obj 可以访问到构造函数中的属性
  // 返回对象
  var ret = Con.apply(obj, arguments);
  // 优先返回构造函数返回的对象
  return ret instanceof Object ? ret : obj;
}
// 实例 car 中只能访问到构造函数中的属性，和情况1完全相反，结果相当于没有返回值。
// 所以需要判断下返回的值是不是一个对象，如果是对象则返回这个对象，不然返回新创建的 obj对象

// 测试用例
function Car(color) {
  this.color = color;
}
Car.prototype.start = function () {
  console.log(this.color + " car start");
}

var car = create(Car, "black");
car.color;
// black

car.start();
// black car start
