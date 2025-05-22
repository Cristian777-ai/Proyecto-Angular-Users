
const jsonServer = require('json-server')
const server     = jsonServer.create()
const router     = jsonServer.router('db.json')
const middlewares= jsonServer.defaults()

server.use(middlewares)
server.use(jsonServer.bodyParser)


server.post('/auth/login', (req, res) => {
  const { username, password } = req.body
  const user = router.db
    .get('auth')
    .find({ username, password })
    .value()

  if (user) {

    res.jsonp({ token: 'fake-jwt-token' })
  } else {
    res.status(401).jsonp({ error: 'Credenciales inválidas' })
  }
})


server.use(router)
server.listen(3000, () => {
  console.log('JSON Server listening on port 3000')
})