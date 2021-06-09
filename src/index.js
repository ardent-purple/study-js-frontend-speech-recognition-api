const Koa = require('koa')
const serve = require('koa-static')
const path = require('path')

const staticDirPath = path.join(__dirname, 'public')

const server = new Koa()

server.use(serve(staticDirPath))

const port = process.env.PORT || 3000
server.listen(port, () => {
  console.log(`Server listening on port ${port}`)
})
