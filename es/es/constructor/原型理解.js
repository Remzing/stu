//
console.log(Function.prototype === Object.__proto__)
console.log(Function.prototype === Function.__proto__)
console.log(Object.prototype === Function.__proto__.__proto__)
console.log(Object.prototype === Object.__proto__.__proto__)


// 
Function.__proto__ === Function.prototype
Function.__proto__.__proto__ === Object.prototype

Object.__proto__ === Function.prototype
Object.__proto__.__proto__ === Object.prototype

