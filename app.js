import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from './src/schemas'
import resolvers from './src/resolvers'
import models from './models'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: {
    models,
  },
})

const PORT = 5000
const app = express()

app.use(bodyParser.json())

server.applyMiddleware({ app })

models.sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server started at ${PORT}${server.graphqlPath}`)
  )
})
