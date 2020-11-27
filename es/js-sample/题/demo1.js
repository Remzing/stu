/**
 * 实现一个class PeopleSet 达到以下效果
 * var peopleSet = new PeopleSet()
 * 
 * peopleSet.sayHi('jack')打印 
 * hello jack
 * 
 * peopleSet.sayHi('jack').eat('dinner')
 * hello jack
 * eat dinner
 * 
 * peopleSet.sayHi('jack').sleep(10).eat('dinner')
 * hello jack
 * eat dinner
 * sleep 10s
 * 
 * peopleSet.sayHi('jack').eat('dinner').sleepFirst()
 * 
 * sleepFirst
 * hello jack
 * eat dinner
 */

class PeopleSet {
  constructor() {
    this.run = false
    this.fnArr = []
    console.log('constructor')

    setTimeout(() => {
      this.run = true
      console.log('setTimeout', this.fnArr)
      this.fnArr.forEach(item => {
        let [fn, ...args] = item.split('-');
        (typeof this[fn] === 'function') && this[fn](...args)
      })
    });
  }

  sayHi(name) {
    // console.log('sayHi', this.fnArr)
    if (!this.run) {
      // for (let i = 0; i < 50; i++) {
      //   console.log(i)
      // }
      this.fnArr.push(`sayHi-${name}`)
    } else {
      console.log(`hello ${name}`)
    }
    return this
  }
  eat(food) {
    // console.log('eat', this.fnArr)
    if (!this.run) {
      this.fnArr.push(`eat-${food}`)
    } else {
      console.log(`eat ${food}`)
    }
    return this
  }
  sleep(time) {
    // console.log('sleep', this.fnArr)
    if (!this.run) {
      this.fnArr.push(`sleep-${time}`)
    } else {
      setTimeout(() => {
        console.log(`sleep ${time}s`)
      }, time);
    }
    return this
  }
  sleepFirst() {
    // console.log('sleepFirst', this.fnArr)
    if (!this.run) {
      this.fnArr.push(`sleepFirst`)
    } else {
      console.log(`sleepFirst`)
    }
    return this
  }
  // 扩展
  // sleepFirst(time) {
  //   if (!this.run) {
  //     this.fnArr.push(`sleepFirst-${time}`)
  //   } else {
  //     setTimeout(() => {
  //       console.log(`sleepFirst ${time}m`)
  //     }, time);
  //   }
  //   return PeopleSet
  // }
}
let peopleSet = new PeopleSet()
peopleSet.sayHi('jack').sleep(4).eat('dinner').sleepFirst()