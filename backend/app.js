import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'
import cors from 'cors'
import jwt from 'jsonwebtoken'

import {
  createToken,
  refreshToken as refreshExpiredToken,
} from './src/utilities/authentication'
import models from './models'
import typeDefs from './src/schemas'
import resolvers from './src/resolvers'

export const SECRET = 'snor1ex'
export const SECRET2 = 'snor1exSuperSecret'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const PORT = 5000
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.use(async (req, res, next) => {
  const token = req.headers['authorization']
  console.log('----Token----', req.headers)
  if (token) {
    try {
      const { user } = jwt.verify(token.replace('Bearer ', ''), SECRET)
      req.user = user
    } catch (error) {
      console.log('---jwt verify error---', error)
      const refreshToken = req.headers['x-refresh-token']
      const newToken = await refreshExpiredToken(
        token,
        refreshToken,
        models,
        SECRET,
        SECRET2
      )
      if (newToken) {
        res.set('authorization', `Bearer ${newToken.token}`)
        res.set('x-refresh-token', newToken.refreshToken)
      }
    }
  }
  next()
})

const server = new ApolloServer({
  schema,
  context: (req) => ({
    models,
    SECRET,
    SECRET2,
    user: req.user,
  }),
})

server.applyMiddleware({ app })

models.sequelize.sync({ force: false, logging: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started at ${PORT}${server.graphqlPath}`)
  )
})
