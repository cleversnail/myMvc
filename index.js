// const Koa = require('koa');          
// const router = require('./routes')
// const app = new Koa()
// app.use(router.routes())
// app.listen(3000)


// const app = new (require('koa'))()
// const { initRouter } = require('./wn-loader')
// app.use(initRouter().routes())
// app.listen(3000)

const wn = require('./wn')
const app = new wn()
app.start(3000)