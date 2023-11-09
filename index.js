const express = require('express')
const app = express()
require('dotenv').config()
const { User, Token, Role, Permission } = require('./app/models')
const bcrypt = require('bcrypt')
const randomString = require('randomstring')
const allowedTo = require('./app/constants/permission')

const port = process.env.APP_PORT || 3000

app.use(express.json())

const tokenAuth = async (req, res, next) => {
  const authorizationToken = req.headers['authorization']
  if (!authorizationToken) {
    res.status(401).send({ error: 'No token provided' })
    return
  }
  const userToken = await Token.findOne({ where: { token: authorizationToken } })
  if (!userToken) {
    res.status(401).send({ error: 'Invalid token' })
    return
  }
  const user = await User.findByPk(userToken.userId)
  req.user = user.toJSON()

  next()
}

const permission = (permission) => {
  return async (req, res, next) => {
    const user = req.user
    const userPermissions = await Role.findOne({
      where: { id: user.roleId },
      include: { model: Permission }
    }).then((role) => {
      return role.Permissions.map((permission) => permission.name)
    })

    console.log(permission)
    console.log(userPermissions)

    if (!userPermissions.includes(permission)) {
      res.status(403).send({ error: 'You are not allowed to access this resource' })
      return
    }

    next()
  }
}

app.post('/', async (req, res) => {
  const { email, password } = req.body
  const user = await User.findOne({
    where: { email: email }
  })

  if (!user) {
    res.status(422).send({ error: 'Invalid credentials' })
    return
  }

  const validPassword = await bcrypt.compare(password, user.password)
  if (!validPassword) {
    res.status(422).send({ error: 'Invalid credentials' })
    return
  }

  const token = randomString.generate()
  await Token.create({ userId: user.id, token: token })
  res.json({ token: token })
})

app.get('/protected', tokenAuth, async (req, res) => {
  res.json({
    message: 'This is a protected route'
  })
})

app.get('/with-authorization', tokenAuth, permission(allowedTo.BROWSE_BOOKS), (req, res) => {
  res.json({
    message: 'This is a protected route with authorization'
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
