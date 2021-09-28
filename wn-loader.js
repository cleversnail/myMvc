const fs = require('fs')
const path = require('path')
const Router = require('koa-router')

// 读取目录和文件
function load(dir, cb) {
  // 获取绝对路径
  const url = path.resolve(__dirname, dir)
  // 读取目录
  const files = fs.readdirSync(url)
  // 遍历
  files.forEach(filename => {
    // index.js 去除扩展名
    filename = filename.replace('.js', '')
    const file = require(url + '/' + filename)
    cb(filename, file)
  })
}

// 加载路由
function initRouter(app) {
  const router = new Router()
  load('routes', (filename, routes) => {
    routes = typeof routes === 'function' ? routes(app) : routes

    const prefix = filename === 'index' ? '' : `/${filename}`
    Object.keys(routes).forEach(key => {
      const [method, path] = key.split(' ')  // ['get', '/']
      console.log(`正在映射地址: ${method.toLocaleUpperCase()} ${prefix}${path}`);

      // 注册路由
      // app.get('/', ctx => {})
      router[method](prefix+path, async ctx => {
        app.ctx = ctx
        await routes[key](app)
      })
    })
  })
  return router
}

// 初始化控制层
function initController() {
  const controllers = {}
  load('controller', (filename, controller) => {
    controllers[filename] = controller
  })
  return controllers
}


// 初始化服务层
function initService() {
  const services = {}
  load('service', (filename, service) => {
    services[filename] = service
  })
  return services
}

const Sequelize = require('sequelize')
function loadConfig(app) {
  load('config', (filename, conf) => {
    if (conf.db) {
      app.$db = new Sequelize(conf.db) // 初始化db操作

      // 加载模型
      app.$model = {}
      load('model', (filename, { schema, options }) => {
        // 利用Sequelize把model下的所有文件都映射成数据库表
        app.$model[filename] = app.$db.define(filename, schema, options) 
      })
      app.$db.sync() // 模块同步
    }
  })
}

module.exports = {
  initRouter,
  initController,
  initService,
  loadConfig
}