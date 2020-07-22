// 单向链表

// 链表的单个对象
function LinkObj(val) {
  this.val = val
  this.next = null // next存的是下一个对象
}
function LinkList() {
  this.head = new LinkObj("head")
  this.insert = insert // 添加
  this.find = find  // 查找
  this.findPrev = findPrev  // 查找上一个
  this.display = display // 显示
  this.del = del //删除
}
function insert(newValue, item) {
  var newNode = new LinkObj(newValue)
  var current = this.find(item)
  newNode.next = current.next
  current.next = newNode
}
function find(item) {
  var current = this.head
  while (current.val !== item) {
    current = current.next
  }
  return current
}
function display() {
  var current = this.head
  while (current.next !== null) {
    console.log(current.next.val)
    current = current.next
  }
}
// 找到上一个链表节点
function findPrev(item) {
  var current = this.head
  while (current.next && current.next.val !== item) {
    current = current.next
  }
  return current
}
function del(item) {
  var current = this.find(item)
  var prev = this.findPrev(item)
  prev.next = current.next
  current.next = null
}

var llink = new LinkList()
var a = { aa: 1 }
var b = [{ bb: 2 }]
var c = Symbol(3)
var d = { aa: 1 }
llink.insert(a, "head")
llink.insert(b, a)
llink.insert(c, b)
llink.insert(d, c)
// llink.display()
llink.del(b)
llink.display()