// 用法
// 检验数据类型
function type(obj) {
  var regexp = /\s(\w+)\]/;
  var result = regexp.exec(Object.prototype.toString.call(obj))[1];
  return result;
};

console.log(type([123]));//Array
console.log(type('123'));//String
console.log(type(123));//Number
console.log(type(null));//Null
console.log(type(undefined));//Undefined

// 函数arguments类数组操作
var fn = function () {
  var arr = Array.prototype.slice.call(arguments);
  console.log(arr); //[1, 2, 3, 4]
};
fn(1, 2, 3, 4);

var arr = [11, 1, 0, 2, 3, 5];
// 取最大
var max1 = Math.max.call(null, ...arr);
var max2 = Math.max.apply(null, arr);
// 取最小
var min1 = Math.min.call(null, ...arr);
var min2 = Math.min.apply(null, arr);

// 数组取最大/小值
console.log(max1); //11
console.log(max2); //11
console.log(min1); //0
console.log(min2); //0