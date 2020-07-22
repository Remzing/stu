Function.prototype.bindCopy = function (newThis) {
  if (typeof this !== "function") {
    return new TypeError("error 'bindCopy' ")
  }
  //! Array.prototype.slice.call 能将有length属性的对象转换为数组
  var args = Array.prototype.slice.call(arguments, 1) // 拿到除了newThis之外的其他参数
  var that = this
  return function () {
    that.apply(newThis, args.concat(Array.prototype.slice.call(arguments))) //! apply 接受的是参数数组
    // that.call(newThis, ...arguments) //! call 接受的是参数列表
  }
}

var foo = function () {
  console.log("this", this)
  console.log("arguments", arguments)
}
foo.bindCopy({ new: "newBind" }, "bindparams")(111, 2222)