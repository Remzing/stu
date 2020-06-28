// webpcak 是基于nodejs的
//! 要使用CommonJS规范导出对象
var path = require("path")
module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "main.js"
  }
} 