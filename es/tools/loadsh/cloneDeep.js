function getType(obj) {
  return Object.prototype.toString.call(obj).slice(8, -1);
}
// 只考虑普通对象和数组情况 未考虑循环引用，symbol
function deepClone(source) {
  if (!isObject(source)) return source; // 非对象返回自身

  var target = Array.isArray(source) ? [] : {};
  for (var key in source) {
    if (Object.prototype.hasOwnProperty.call(source, key)) {
      if (isObject(source[key])) {
        target[key] = deepClone(source[key]); // 注意这里
      } else {
        target[key] = source[key];
      }
    }
  }
  return target;
}
function isObject(obj) {
  return typeof obj === 'object' && obj != null;
}
var a = { b: { foo: [] }, c: [3, 2] };
var copy = deepClone(a);
copy.b.foo = "123";
console.log(a);
console.log(copy);
console.log("copy", a.b.foo);
console.log("a.c===copy.c", a.c === copy.c);
console.log("a.b===copy.b", a.b === copy.b);
