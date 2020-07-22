Function.prototype.callSet = function (obj) {
  // 判断是否为null或者undefined,同时考虑传递参数不是对象情况
  obj = obj ? Object(obj) : window;
  // i从1开始，第一个代表传进来的this
  var args = []
  for (var i = 1; i < arguments.length; i++) {
    args.push("arguments[" + i + "]")
  }
  obj.fn = this
  eval("obj.fn(" + args + ")"); // 执行fn
  delete obj.fn
}

var name = 'window-时间跳跃';
var obj = {
  name: 'obj-听风是风'
};

function fn(a, b, c) {
  console.log(a + b + c + this.name);
};
fn() // 在node环境 显示undefined，没有window'对象
fn.callSet(obj, 1, 2, 3)