const Koa = require('koa')
const { initRouter, initController, initService, loadConfig } = require('./wn-loader')

// 定义一个自己的框架名
class wn {
  constructor() {
    // 挂载上koa实例
    this.$app = new Koa()
    loadConfig(this)
    this.$service = initService()
    // 分别初始化路由控制层和路由层
    this.$ctrl = initController()
    this.$router = initRouter(this)
    // koa的注册路由写法
    this.$app.use(this.$router.routes())
  }

  start(port) {
    this.$app.listen(port, () => {
      console.log(`wn服务已启动成功 端口: ${port}`);
    })
  }
}

module.exports = wn