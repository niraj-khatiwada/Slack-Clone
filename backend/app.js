//@ts-check
import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer, makeExecutableSchema } from 'apollo-server-express'

import models from './models'
import typeDefs from './src/schemas'
import resolvers from './src/resolvers'

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
})

const server = new ApolloServer({
  schema,
  context: {
    models,
  },
})

const PORT = 5000
const app = express()

app.use(bodyParser.json())

server.applyMiddleware({ app })

models.sequelize.sync({ force: true, logging: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started at ${PORT}${server.graphqlPath}`)
  )
})
