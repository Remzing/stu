class RVue {
  constructor(options) {
    // 保存传进来的选项
    this.$options = options

    // 传入data
    this.$data = options.data

    //响应化处理
    this.observe(this.$data)

    // new Watcher(this, 'foo')
    // this.foo
    // new Watcher(this, 'aaa.bbb')
    // this.aaa.bbb

    new Compile(options.el, this)

    if (options.created) {
      options.created.call(this)
    }
  }
  observe(obj) {
    if (!obj || typeof obj !== "object") {
      return
    }

    //遍历value
    Object.keys(obj).forEach(key => {
      // 响应化处理
      this.defineReactive(obj, key, obj[key])

      //代理  是为了使用方式正常化 eg：访问app.foo,不通过app.$data.foo
      this.proxyData(key)
    })
  }
  defineReactive(obj, key, val) {
    // 递归遍历
    this.observe(val)
    // 定义一个Dep 
    const dep = new Dep() //每个dep实例都和data中的每一个key有一对一的关系

    // 给 obj 的每一个key定义拦截
    Object.defineProperty(obj, key, {
      get() {
        console.log(key + "属性获取到了")
        // 依赖收集
        Dep.target && dep.addDep(Dep.target)
        return val
      },
      set(newVal) {
        if (newVal !== val) {
          val = newVal
          dep.notify()
        }
      }
    })
  }
  proxyData(key) {
    // this 指的是RVue的实例
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
    //存储所有依赖
    this.watchers = []
  }
  addDep(watcher) {
    this.watchers.push(watcher)
  }
  notify() {
    this.watchers.forEach(watcher => watcher.update())
  }
}

//watcher :保存data中的值与页面中的挂钩关系
class Watcher {
  constructor(vm, key, cb) {
    // 创建实例时立刻将该实例指向Dep.target 便于依赖收集 静态变量
    this.vm = vm
    this.key = key
    this.cb = cb

    // 触发依赖收集 完成收集
    Dep.target = this
    this.vm[this.key] // 触发依赖收集
    Dep.target = null
  }
  // 更新
  update() {
    this.cb && this.cb.call(this.vm, this.vm[this.key])
    console.log(`${this.key}更新了`)
  }
}