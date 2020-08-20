// 下载脚本功能
<a ref="elink"></a>


function download() {
  this.$refs.elink.download = `${name}.sh` // 设置名称
  this.$refs.elink.display = `none` // 设置链接隐藏
  // new 一个blob实例 设置格式 存储url信息
  let blob = new Blob([data], { type: 'application/force-download' })
  // 挂载a标签的 href 链接
  this.$refs.elink.href = URL.createObjectURL(blob)
  // 触发click时间
  this.$refs.elink.onclick()
  // 注销
  URL.revokeObjectURL(blob)
} 