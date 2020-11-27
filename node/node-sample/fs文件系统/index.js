const fs = require('fs')
const path = require('path')
// fs.copyFileSync(path.join(__dirname, '1.txt'), path.join(__dirname, '2.txt'))


// fs.readFile(path.join(__dirname, '1.txt'), function (err, data) {
//   if (err) throw err
//   // loadServer(data)
//   console.log(data)
// })

// 或者换同步的方式
// const data = fs.readFileSync(path.join(__dirname, '1.txt'))
// loadServer(data) 


// 先把 readFile 封装到一个 Prmoise 里面
const readFile = filePath => new Promise((resolve, reject) => {
  fs.readFile(filePath, (err, data) => resolve(data))
});

// 然后通过 Promise..then 链式调用
readFile('./1.txt')
  .then(data => readFile(data.cfgPath))
  .then(data => readFile(data.cfgPath))
  .then(data => readFile(data.cfgPath))
  .then(data => {
    console.log('data4.cfgPath:', data)
  })
