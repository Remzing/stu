// 遍历dom结构， 解析指令和插值表达式
class Compile {
  // el ->是待编译的模板， vm是RVue的实例
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    // 把模板中的内容移到片段操作 保持操作的效率和一致性
    this.$fragment = this.node2Fragment(this.$el)
    // 执行编译
    this.compile(this.$fragment)
    // 放回$el中
    this.$el.appendChild(this.$fragment)

  }
  node2Fragment(el) {
    const fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      // appendChild : 如果是一个已存在的节点 该节点会从原来的位置移动到当前append的位置，也就是移动操作
      fragment.appendChild(child)
    }
    return fragment
  }
  // 
  compile(el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach(node => {
      if (node.nodeType == 1) {
        // 元素 
        console.log("编译元素" + node.nodeName)
        this.compileElement(node)
      } else if (this.isInter(node)) {
        // 只关心{{xxx}}
        console.log("编译插值文本" + node.textContent)
        this.compileText(node)
      }

      //递归子节点
      if (node.children && node.childNodes.length > 0) {
        this.compile(node)
      }
    });
  }
  isInter(node) {
    return node.nodeType == 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
  compileText(node) {
    console.log(RegExp.$1)
    // node.textContent = this.$vm[RegExp.$1]
    const exp = RegExp.$1
    this.update(node, this.$vm, exp, 'text')

  }
  update(node, vm, exp, dir) {
    const updater = this[dir + 'Updater']
    updater && updater(node, this.$vm[exp]) // 初始化

    // 这里创建watcher实例 依赖收集就完成了
    new Watcher(this.$vm, exp, function (value) {
      updater && updater(node, value)
    })
  }
  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
  modelUpdater(node, value) {
    node.value = value
  }
  compileElement(node) {
    const nodeAttrs = node.attributes
    Array.from(nodeAttrs).forEach(attr => {
      // 规定 r-xxx="yyy"
      const attrName = attr.name // r-xxx
      const exp = attr.value  // yyy
      if (attrName.indexOf("r-") == 0) {
        // 指令
        const dir = attrName.substring(2)
        // 执行
        // this.update(node, exp, dir)

        this[dir] && this[dir](node, this.$vm, exp)
      } else if (attrName.indexOf("@") == 0) {
        // 指令
        const dir = attrName.substring(1)

        this.eventHandler(node, this.$vm, exp, dir)
      }
    })
  }
  text(node, vm, exp) {
    this.update(node, vm, exp, 'text')
  }
  html(node, vm, exp) {
    this.update(node, vm, exp, 'html')
  }
  model(node, vm, exp) {
    console.log("model:" + exp, node)
    this.update(node, vm, exp, 'model')
    node.addEventListener("input", e => {
      vm[exp] = e.target.value
    })
  }
  eventHandler(node, vm, exp, dir) {
    let fn = vm.$options.methods && vm.$options.methods[exp]
    if (dir && fn) {
      node.addEventListener(dir, e => {
        fn.call(vm)
      })
    }
  }
}