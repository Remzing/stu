Function.prototype.applySet = function (obj, arr) {
  obj = obj ? Object(obj) : window ? window : ""
  obj.fn = this

  if (!arr) {
    obj.fn()
  } else {
    var args = []
    for (let i = 0; i < arr.length; i++) {
      args.push("arr[" + i + "]")
    }
    eval("obj.fn(" + args + ")")
  }

  delete obj.fn
}

var name = '时间跳跃';
var obj = {
  name: '听风是风'
};

function fn(a, b, c) {
  console.log(a + b + c + this.name);
};

fn.applySet(obj, ["我的", "名字", "是"]); // 我的名字是听风是风
fn.applySet(null, ["我的", "名字", "是"]); // 我的名字是时间跳跃
fn.applySet(undefined, ["我的", "名字", "是"]); // 我的名字是时间跳跃