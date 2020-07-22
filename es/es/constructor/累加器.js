// 我们知道打印函数时会自动调用 toString()方法，函数 add(a) 返回一个闭包 sum(b)，
// 函数 sum() 中累加计算 a = a + b，只需要重写sum.toString()方法返回变量 a 就OK了

// 考察闭包 作用域链 
function add(a) {
  function sum(b) { // 使用闭包
    a = a + b; // 累加
    return sum;
  }
  sum.toString = function () { // 重写toString()方法
    return a;
  }
  return sum; // 返回一个函数
}

console.log(add(1)); // 1
console.log(add(1)(2));  // 3 