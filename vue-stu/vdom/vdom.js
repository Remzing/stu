/**
 *  2.如何新建虚拟dom
 *
 * */
const vnodeType = {
  HTML: "HTML",
  TEXT: "TEXT",
  COMPONENT: "COMPONENT",
  CLASS_COMPONENT: "CLASS_COMPONENT",
}
const childType = {
  EMPTY: "EMPTY",
  SINGLE: "SINGLE",
  MULTIPLE: "MULTIPLE",
}
// 新建虚拟dom
function createElement(tag, data, children) {
  let flag
  if (typeof tag == "string") {
    // 普通的html标签
    flag = vnodeType.HTML
  } else if (typeof tag == "function") {
    flag = vnodeType.COMPONENT
  } else {
    flag = vnodeType.TEXT
  }
  let childrenFlag
  console.log(children)
  if (children == null) {
    childrenFlag = childType.EMPTY
  } else if (Array.isArray(children)) {
    let length = children.length
    if (length == 0) {
      childrenFlag = childType.EMPTY
    } else {
      childrenFlag = childType.MULTIPLE
    }
  } else {
    childrenFlag = childType.SINGLE
    children = createTextVnode(children + '')
  }
  //返回
  return {
    flag, // vnode类型
    tag,  //标签 ，div， 文本没有tag 组件就是函数
    data,
    key: data && data.key,
    children,
    childrenFlag,
    el: null
  }
}
// 新建文本类型的vnode
function createTextVnode(text) {
  return {
    flag: vnodeType.TEXT,
    tag: null,
    data: null,
    children: text,
    childrenFlag: childType.EMPTY,
  }
}
// 渲染
// 需要渲染的虚拟dom ,容器
function render(vnode, container) {
  // 区分首次渲染 和再次渲染
  if (container.vnode) {
    patch(container.vnode, vnode, container)
  } else {
    mount(vnode, container)
  }

  container.vnode = vnode
}
function patch(prev, next, container) {
  let nextFlag = next.flag
  let prevFlag = prev.flag

  // eg: prev是HTML next是TEXT 直接替换
  if (nextFlag !== prevFlag) {
    repalceVnode(prev, next, container)
  } else if (nextFlag == vnodeType.HTML) {
    patchElemnt(prev, next, container)
  } else if (nextFlag == vnodeType.TEXT) {
    patchText(prev, next)
  }
}
function patchElemnt(prev, next, container) {
  // eg: prev是div next是p 直接替换
  if (prev.tag !== next.tag) {
    repalceVnode(prev, next, container)
    return
  }
  let el = (next.el = prev.el)
  let prevData = prev.data
  let nextData = next.data
  if (nextData) {
    for (const key in nextData) {
      if (nextData.hasOwnProperty(key)) {
        let nextVal = nextData[key];
        let prevVal = prevData[key];
        patchData(el, key, prevVal, nextVal)
      }
    }
  }
  if (prevData) {
    for (const key in prevData) {
      if (prevData.hasOwnProperty(key)) {
        let prevVal = prevData[key];
        if (prevVal && !nextData.hasOwnProperty(key)) {
          patchData(el, key, prevVal, null)
        }
      }
    }
  }
  // data更新完毕 对比children
  patchChildren(
    prev.childrenFlag,
    next.childrenFlag,
    prev.children,
    next.children,
    el
  )

}
function patchChildren(
  prevChildrenFlag,
  nextChildrenFlag,
  prevChildren,
  nextChildren,
  container
) {
  // 更新子元素
  // 1. 老的是单独的
  // 老的是空的
  // 老的是多个

  // 2.新的是单独的
  // 新的是空的
  // 新的是多个 --》新的老的都是多个是最复杂的对比 (排列组合)
  switch (prevChildrenFlag) {
    // 老的是单个
    case childType.SINGLE:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          patch(prevChildren, nextChildren, container)
          break;
        case childType.EMPTY:
          container.removeChild(prevChildren.el)
          break;
        case childType.MULTIPLE:
          container.removeChild(prevChildren.el)
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break;
      }
      break;

    // 老的是空的 
    case childType.EMPTY:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          mount(nextChildren, container)
          break;
        case childType.EMPTY:

          break;
        case childType.MULTIPLE:
          for (let i = 0; i < nextChildren.length; i++) {
            mount(nextChildren[i], container)
          }
          break;
      }
      break;

    // 老的是多个 
    case childType.MULTIPLE:
      switch (nextChildrenFlag) {
        case childType.SINGLE:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          mount(nextChildren, container)
          break;
        case childType.EMPTY:
          for (let i = 0; i < prevChildren.length; i++) {
            container.removeChild(prevChildren[i].el)
          }
          break;
        case childType.MULTIPLE:
          // 众多虚拟dm 就在这里进行区分 ，每家优化策略不一样
          // 老的是个数组 新的也是个数组
          console.log("都是数组")
          // 相对递增概念
          // abc  => abc  012顺序是递增 不需要修改
          // abc  => cab 201需要修改
          // sdaxxxbxxc adc还是递增不需要修改 只需要插入新增的值
          let lastIndex = 0
          for (let i = 0; i < nextChildren.length; i++) {
            let find = false
            let nextVnode = nextChildren[i];
            let j = 0
            for (j; j < prevChildren.length; j++) {
              let prevVnode = prevChildren[j];
              if (prevVnode.key === nextVnode.key) {
                // key相同 我们认为是同一个元素  
                // 所以vue推荐v-for不要用索引作为key，
                // 用索引当做key就用不到缓存，就失去key的意义了
                find = true
                patch(prevVnode, nextVnode, container)
                if (j < lastIndex) {
                  // 需要移动
                  // insertBefore移动元素
                  // abc a想移动到b之后 需要abc父元素 insertBefore(b的下一个元素)
                  let flagNode = nextChildren[i - 1].el.nextSibling
                  container.insertBefore(prevVnode.el, flagNode)
                  break
                } else {
                  lastIndex = j
                }
              }
            }
            if (!find) {
              // 需要新增
              let flagNode = i == 0 ? prevChildren[0].el : nextChildren[i - 1].el.nextSibling
              console.log("flagNode", flagNode)
              console.log("nextVnode", nextVnode)
              mount(nextVnode, container, flagNode)
            }
          }
          // 移除不需要的元素
          for (let i = 0; i < prevChildren.length; i++) {
            const prevVnode = prevChildren[i];
            const has = nextChildren.find(next => next.key == prevVnode.key)
            if (!has) {
              container.removeChild(prevVnode.el)
            }
          }
          // console.log("container", container)
          break;
      }
      break;

    default:
      break;
  }
}
function patchText(prev, next) {
  let el = (next.el = prev.el)
  if (next.children !== prev.children) {
    el.nodeValue = next.children
  }
}
function repalceVnode(prev, next, container) {
  container.removeChild(prev.el)
  mount(next, container)
}
function mount(vnode, container, flagNode) {
  //首次挂载元素
  let { flag } = vnode
  if (flag == vnodeType.HTML) {
    mountElement(vnode, container, flagNode)
  } else if (flag == vnodeType.TEXT) {
    mountText(vnode, container)
  }
}
function mountElement(vnode, container, flagNode) {
  let dom = document.createElement(vnode.tag)
  vnode.el = dom
  let { data, children, childrenFlag } = vnode

  //挂载data属性
  if (data) {
    for (let key in data) {
      // 节点 名字 老值 新的值
      patchData(dom, key, null, data[key])
    }

  }
  if (childrenFlag !== childType.EMPTY) {
    if (childrenFlag == childType.SINGLE) {
      mount(children, dom)
    } else if (childrenFlag == childType.MULTIPLE) {
      for (let i = 0; i < children.length; i++) {
        mount(children[i], dom)
      }
    }
  }
  console.log(dom)
  //如果 flagNode存在  就在flagNode前面新增
  flagNode ? container.insertBefore(dom, flagNode) : container.appendChild(dom)
}
function patchData(el, key, prev, next) {
  switch (key) {
    case "style":
      for (const k in next) {
        if (next.hasOwnProperty(k)) {
          el.style[k] = next[k];
        }
        break;
      }
      for (const k in prev) {
        if (!(next.hasOwnProperty(k))) {
          el.style[k] = ""
        }
        break;
      }
      break;
    case "class":
      el.className = next
    default:
      if (key[0] === "@") {
        if (prev) {
          el.removeEventListener(key.slice(1), next)
        }
        if (next) {
          el.addEventListener(key.slice(1), next)
        }
      } else {
        el.setAttribute(key, next)
      }
      break;
  }
}
function mountText(vnode, container) {
  let dom = document.createTextNode(vnode.children)
  vnode.el = dom
  container.appendChild(dom)
}