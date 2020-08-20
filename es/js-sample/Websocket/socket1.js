const Protocol = "base64.binary.k8s.io"; // binary.k8s.io
const Prefix = "base64url.bearer.authorization.k8s.io"

let protocols = [Prefix + base64.urlencode(localStorage.getItem("okdToken")), Protocol,]
let url = `${this.$api.logWs}/api/v1/namespace/${data.namespace}/log?follow=true&tailLines=${limit}&limitBytes=10485760&container=${data.container}`

let socket = new WebSocket(url, protocols)
socket.onmessage = this.onmessage()
socket.onopen = this.onopen()
socket.onerror = this.onerror()
socket.onclose = this.onclose()

onmessage(ev)

disconnect(){
  if (this.ws) {
    // 清空操作

  }
}