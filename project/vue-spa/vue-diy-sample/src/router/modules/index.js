import pro1 from './pro1.js'
import pro2 from './pro2.js'

let getRoute = (node) => {
  let routes = [],
    basePath = node.publicPath;

  function _deep(node, reduceInfo) {
    let nodes = []
    if (node.name) {
      let _crumbs = [...reduceInfo.crumbs]
      node.pathName && _crumbs.push({
        pathName: node.pathName,
        name: node.name,
      })
      routes.push({
        name: node.name,
        path: basePath + reduceInfo.path + node.path,
        component: node.component,
        crumbs: _crumbs,
        meta: {
          indexName: reduceInfo.indexName || node.name,
          ...(node.meta || {}),
          level: reduceInfo.level
        }
      })
    }
    if (node != null) {
      nodes.push(node)
      let children = node.next || []
      if (children.length) {
        let crumbs = [...reduceInfo.crumbs]
        node.pathName && crumbs.push({
          pathName: node.pathName,
          name: node.name,
        })
        let stop = reduceInfo.stop || false
        if (!stop) {
          stop = (node.name && node.name.endsWith("_m"))
        }
        const nextInfo = {
          path: node.path ? reduceInfo.path + node.path : "",
          crumbs,
          indexName: node.namespaceShowType ? node.name : reduceInfo.indexName,
          level: stop ? reduceInfo.level : reduceInfo.level + 1,
          stop: stop,
        }
        for (let i = 0; i < children.length; i++) {
          _deep(children[i], nextInfo)
        }
      }

    }
  }
  _deep(node, {
    path: "",
    crumbs: [],
    level: 1,
  })
  return routes
}
let routerList = []
const moduleList = [pro1, pro2]
moduleList.forEach(item => {
  routerList.push(...getRoute(item))
})
console.log("routerList", routerList)
export default {
  routerList,
}