const obj = { name: 'krry', age: 24, others: [1, 2, 3] }
const p = new Proxy(obj, {
  get(target, key, receiver) {
    console.log('查看的属性为：' + key);
    return Reflect.get(target, key, receiver);
  },
  set(target, key, value, receiver) {
    console.log('设置的属性为：' + key);
    console.log('新的属性：' + key, '值为：' + value);
    Reflect.set(target, key, value, receiver);
  }
})
// p.age = 22
// console.log(p.age)
// console.log('--------')
// p.single = 'NO'
// console.log(p.single)
// console.log('--------')
// p.others.push('boost')
p.others[3] = ('boost')
// console.log(p.others)

