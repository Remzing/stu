let a = {
  b: 1,
  c: function () {
    console.log(this.b)
  },
  e: () => {
    console.log(this.b)
  }
}
a.c()
let d = a.c
d()