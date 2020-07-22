// -----1 原型链继承 -----
//! 原型链继承 创建SuperType的实例，并将该实例赋值给SubType.prototype
// 原型链方案存在的缺点：多个实例对引用类型的操作会被篡改。
function SuperType() {
  this.property = true
}
SuperType.prototype.getSuperValue = function () {
  console.log(this.property)
  return this.property
}

function SubType() {
  this.subProperty = false
}
SubType.prototype = new SuperType()

var instance = new SubType()
instance.getSuperValue()
// ----- 原型链继承 END -----

// -----2 构造函数继承 -----
//! 使用父类的构造函数来增强子类实例，等同于复制父类的实例给子类（不使用原型）
// 缺点1：只能继承父类的实例属性和方法，不能继承原型属性/方法
// 缺点2：无法实现复用，每个子类都有父类实例函数的副本，影响性能
function SuperType() {
  this.color = ['red', 'green', 'pink']
}
function SubType() {
  // 继承自 SuperType
  SuperType.call(this)
}
var instance1 = new SubType();
instance1.color.push("black");
console.log(instance1.color); //"red,green,pink,black"

var instance2 = new SubType();
console.log(instance2.color);//"red,green,blue"
// ----- 构造函数继承 END-----

// -----3 组合继承 -----
//! 组合上述两种方法就是组合继承。用原型链实现对原型属性和方法的继承，用借用构造函数技术来实现实例属性的继承。
// 实例对象instance1上的两个属性就屏蔽了其原型对象SubType.prototype的两个同名属性。所以，组合模式的缺点就是在使用子类创建实例对象时，其原型中会存在两份相同的属性/方法
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  alert(this.name);
};

function SubType(name, age) {
  // 继承属性
  // 第二次调用SuperType()
  SuperType.call(this, name);
  this.age = age;
}
// 继承方法
// 构建原型链
// 第一次调用SuperType()
SubType.prototype = new SuperType();
// 重写SubType.prototype的constructor属性，指向自己的构造函数SubType
SubType.prototype.constructor = SubType;
SubType.prototype.sayAge = function () {
  alert(this.age);
};
var instance1 = new SubType("Nicholas", 29);
instance1.colors.push("black");
console.log(instance1.colors); //"red,blue,green,black"
instance1.sayName(); //"Nicholas";
instance1.sayAge(); //29

var instance2 = new SubType("Greg", 27);
console.log(instance2.colors); //"red,blue,green"
instance2.sayName(); //"Greg";
instance2.sayAge(); //27
// ----- 组合继承 END-----

// -----4 原型式继承 -----
//! 利用一个空对象作为中介，将某个对象直接赋值给空对象构造函数的原型。
// object()对传入其中的对象执行了一次浅复制，将构造函数F的原型直接指向传入的对象。
// 缺点：
// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数
// 另外，ES5中存在Object.create()的方法，能够代替上面的object方法
function object(obj) {
  function F() { }
  F.prototype = obj;
  return new F();
}
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};

var anotherPerson = object(person);
anotherPerson.name = "Greg";
anotherPerson.friends.push("Rob");

var yetAnotherPerson = object(person);
yetAnotherPerson.name = "Linda";
yetAnotherPerson.friends.push("Barbie");

console.log(person.friends);   //"Shelby,Court,Van,Rob,Barbie"
// ----- 原型式继承 END-----

// -----5 寄生式继承 -----
//! 核心：在原型式继承的基础上，增强对象，返回构造函数
function createAnother(original) {
  var clone = object(original); // 通过调用 object() 函数创建一个新对象
  clone.sayHi = function () {  // 以某种方式来增强对象
    alert("hi");
  };
  return clone; // 返回这个对象
}
// 函数的主要作用是为构造函数新增属性和方法，以增强函数
var person = {
  name: "Nicholas",
  friends: ["Shelby", "Court", "Van"]
};
var anotherPerson = createAnother(person);
anotherPerson.sayHi(); //"hi"
// 复制代码缺点（同原型式继承）：

// 原型链继承多个实例的引用类型属性指向相同，存在篡改的可能。
// 无法传递参数

// ----- 寄生式继承 END-----

// -----6 寄生组合式继承 -----
//! 结合借用构造函数传递参数和寄生模式实现继承
function inheritPrototype(subType, superType) {
  var prototype = Object.create(superType.prototype); // 创建对象，创建父类原型的一个副本
  prototype.constructor = subType;                    // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  subType.prototype = prototype;                      // 指定对象，将新创建的对象赋值给子类的原型
}
// 父类初始化实例属性和原型属性
function SuperType(name) {
  this.name = name;
  this.colors = ["red", "blue", "green"];
}
SuperType.prototype.sayName = function () {
  console.log(this.name);
};

// 借用构造函数传递增强子类实例属性（支持传参和避免篡改）
function SubType(name, age) {
  SuperType.call(this, name);
  this.age = age;
}

// 将父类原型指向子类
inheritPrototype(SubType, SuperType);

// 新增子类原型属性
SubType.prototype.sayAge = function () {
  console.log(this.age);
}

var instance1 = new SubType("xyc", 23);
var instance2 = new SubType("lxy", 23);

instance1.colors.push("2"); // ["red", "blue", "green", "2"]
instance1.colors.push("3"); // ["red", "blue", "green", "3"]
// 这个例子的高效率体现在它只调用了一次SuperType 构造函数，并且因此避免了在SubType.prototype 上创建不必要的、多余的属性。
// 于此同时，原型链还能保持不变；因此，还能够正常使用instanceof 和isPrototypeOf()
// 这是最成熟的方法，也是现在库实现的方法
// ----- 寄生组合式继承 END-----

//  -----7 混入方式继承多个对象 -----
function MyClass() {
  SuperClass.call(this);
  OtherSuperClass.call(this);
}

// 继承一个类
MyClass.prototype = Object.create(SuperClass.prototype);
// 混合其它
Object.assign(MyClass.prototype, OtherSuperClass.prototype);
// 重新指定constructor
MyClass.prototype.constructor = MyClass;

MyClass.prototype.myMethod = function () {
  // do something
};
//  -----7 混入方式继承多个对象 END-----

//  -----8 ES6类继承extends -----
// extends继承的核心代码如下，其实现和上述的寄生组合式继承方式一样
function _inherits(subType, superType) {

  // 创建对象，创建父类原型的一个副本
  // 增强对象，弥补因重写原型而失去的默认的constructor 属性
  // 指定对象，将新创建的对象赋值给子类的原型
  subType.prototype = Object.create(superType && superType.prototype, {
    constructor: {
      value: subType,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });

  if (superType) {
    Object.setPrototypeOf
      ? Object.setPrototypeOf(subType, superType)
      : subType.__proto__ = superType;
  }
}
//  -----8 ES6类继承extends END-----

// 1、函数声明和类声明的区别
// 函数声明会提升，类声明不会。首先需要声明你的类，然后访问它，否则像下面的代码会抛出一个ReferenceError。
// let p = new Rectangle(); 
// ReferenceError

// class Rectangle {}
// 复制代码2、ES5继承和ES6继承的区别


// ES5的继承实质上是先创建子类的实例对象，然后再将父类的方法添加到this上（Parent.call(this)）.


// ES6的继承有所不同，实质上是先创建父类的实例对象this，然后再用子类的构造函数修改this。因为子类没有自己的this对象，所以必须先调用父类的super()方法，否则新建实例报错。
