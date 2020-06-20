class Compile {
  constructor(vm, el) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 获取当前dom段 放入文档碎片中去 保持效率和一致性
    this.$fragment = this.node2Fragment(this.$el)

    // 编译 解析模板 指令
    this.compile(this.$fragment)
    // 挂载到dom
    this.$el.appendChild(this.$fragment)
  }
  node2Fragment(el) {
    let fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      /* 如果是一个已存在的节点 执行appendChild该节点会从原来的位置
      移动到当前append的位置，也就是移动操作 */
      fragment.appendChild(child)
    }
    return fragment
  }
  compile(fragment) {
    const childNodes = fragment.childNodes
    childNodes.forEach(node => {

      if (node.nodeType == 1) {
        console.log("元素节点", node)
        this.compileElement(node)
      } else if (this.isInner(node)) {
        console.log("文本节点", node)
        this.compileText(node)

      }
      if (node.children && node.childNodes.length > 0) {
        this.compile(node)
      }
    });
  }
  isInner(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    const exp = RegExp.$1
    // node.textContent = this.$vm[exp]
    this.update(node, exp, 'text')
  }
  update(node, exp, dir) {
    const updater = this[`${dir}Updater`]
    updater && updater(node, this.$vm[exp])

    new Watcher(this.$vm, exp, function (value) {
      updater && updater(node, value)
    })
  }
  // 各指令更新函数
  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  modelUpdater(node, value) {
    node.value = value
  }

  // 元素节点编译函数
  compileElement(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // eg my-xxx="yyy"
      const attrName = attr.name //my-xxx
      const exp = attr.value  // yyy
      if (attrName.indexOf("my-") == 0) {
        const dir = attrName.substring(3)
        this[dir] && this[dir](node, exp, dir, this.$vm)
      } else if (attrName.indexOf("@") == 0) {
        const dir = attrName.substring(1)
        this.eventHandler(node, exp, dir, this.$vm)
      }
    })
  }
  text(node, exp, dir) {
    this.update(node, exp, dir)
  }
  html(node, exp, dir) {
    this.update(node, exp, dir)
  }
  // v-mode input双向绑定函数
  model(node, exp, dir, vm) {
    this.update(node, exp, dir)
    node.addEventListener("input", e => {
      vm[exp] = e.target.value
    })
  }
  // 事件绑定函数
  eventHandler(node, exp, dir, vm) {
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (fn && dir) {
      node.addEventListener(dir, e => {
        fn.call(vm)
      })
    }
  }
}