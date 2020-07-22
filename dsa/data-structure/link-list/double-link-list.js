//  双向链表
function LinkObj(val) {
  this.val = val
  this.next = null  // 下一个
  this.prev = null // 上一个
}
function LinkList() {
  this.head = new LinkObj("head")
  this.find = find
  this.insert = insert
  this.display = display
  this.del = del

  this.findLast = findLast
  this.displayReverse = displayReverse
}
function find(item) {
  var current = this.head
  while (current.val !== item) {
    current = current.next
  }
  return current
}
function insert(newValue, item) {
  var current = this.find(item)
  var newNode = new LinkObj(newValue)
  newNode.next = current.next
  newNode.next && (newNode.next.prev = newNode) // newNode.next为null 代表尾节点
  newNode.prev = current
  current.next = newNode
}
function display() {
  var current = this.head
  while (current.next !== null) {
    console.log(current.next.val)
    current = current.next
  }
}
function findLast() {
  var current = this.head
  while (current.next !== null) {
    current = current.next
  }
  return current
}
// 倒序
function displayReverse() {
  var lastNode = this.findLast()
  while (lastNode.prev !== null) {
    console.log(lastNode.val)
    lastNode = lastNode.prev
  }
}
function del(item) {
  var current = this.find(item)
  current.prev.next = current.next
  current.next && (current.next.prev = current.prev)
  current.val = null
  current.next = null
}


var llink = new LinkList()
var a = { aa: 1 }
var b = [{ bb: 2 }]
var c = Symbol(3)
var d = { aa: 66 }
llink.insert(a, "head")
llink.insert(b, a)
llink.insert(c, b)
llink.insert(d, c)
// llink.display()
// llink.del(c)
// llink.display()
llink.displayReverse()