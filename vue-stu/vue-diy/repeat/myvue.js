class MyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    //劫持监听所有属性
    this.observe(this.$data)

    // new Watcher(this, "foo")
    new Compile(this, options.el)
  }

  observe(obj) {
    if (!obj || typeof obj !== "object") {
      return
    }
    Object.keys(obj).forEach(key => {
      // 劫持data的key
      this.defineReactive(obj, key, obj[key])

      // 代理数据
      this.proxyData(key)
    });
  }
  defineReactive(obj, key, val) {
    // 递归遍历 
    this.observe(val)
    let dep = new Dep()
    console.log("defineReactive", key)
    Object.defineProperty(obj, key, {
      get() {
        console.log(`劫持获取到了属性：${key}`)
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (val !== newVal) {
          console.log(`劫持了属性：${key},并更新了`)
          val = newVal
          dep.notify()
        }
      }
    })
  }
  proxyData(key) {
    Object.defineProperty(this, key, {
      get() {
        return this.$data[key]
      },
      set(newVal) {
        this.$data[key] = newVal
      }
    })
  }
}
// 依赖收集
class Dep {
  constructor() {
    this.watchers = []
  }
  // 收集某个key的所有watcher,以便后面更新之后通知所有watcher
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  // 通知操作
  notify() {
    this.watchers.forEach(watcher => watcher.update())
  }
}

// 订阅
class Watcher {
  constructor(vm, key, cb) {
    this.vm = vm
    this.key = key
    this.cb = cb
    /* 
      每new一次 Watcher ，然后执行 this.vm[key] 都会触发对应的key的get方法，
      而get方法里就是在收集当前key所有相关的watcher，
      以便当当前key的值发生改变之后能通知到所有关联这个key值的dom
    */
    Dep.target = this
    this.vm[key]
    Dep.target = null
  }
  // 每个Watcher实例都有自己需要更新的dom 用update来触发更新
  update() {
    this.cb && this.cb.call(this.vm, this.vm[this.key])
    console.log(`${this.key}更新了(watcher)`)
  }
}