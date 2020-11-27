const fs = require('fs')
const path = require('path')

const chalk = require('chalk')
const ora = require('ora')
const single = require('single')
const shell = require('shell')
// const open = require('open')
// const yargs = require('yargs')
const inquirer = require('inquirer')
const compressing = require('compressing')
const Client = require('ssh2').Client

var cp = require('child_process')

const spinner = ora({
  text: 'connecting server ...',
  color: 'cyan'
})

const server = require('./ssh.config')

const state = {
  buildImageSuccess: false
}
const config = {
  sourcePath: 'dist',
  remotePath: '/opt/web-docker/xxxx'
}

const connect = new Client()

// 连接服务器
function conn(callback) {
  connect.on('ready', () => {
    succeed()
    callback && callback()
  })

  connect.on('error', (err) => {
    console.log(err)
    console.log(chalk.red('connect error. \n'))
  })

  connect.on('end', () => {
    if (state.buildImageSuccess) {
      console.log(chalk.cyan('image build success.'))
      // openChrome(envUrl[params.env])
    }
    console.log(chalk.cyan('connect end.'))
  })
  connect.on('close', (err) => {
    if (err) {
      console.log(err)
      console.log(chalk.red('connect closed. \n'))
    }
  })
  spinner.start('connect server')
  connect.concat(server)
}

// 文件上传
function upload(params) {
  spinner.start('upload file... \n')
  connect.sftp((err, sftp) => {
    if (err) throw err
  })
}

