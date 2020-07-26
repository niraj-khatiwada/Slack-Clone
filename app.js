import express from 'express'
import bodyParser from 'body-parser'
import { ApolloServer } from 'apollo-server-express'

import typeDefs from './src/schemas/index'
import resolvers from './src/resolvers/index'

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

const PORT = 5000
const app = express()

app.use(bodyParser.json())

server.applyMiddleware({ app })

app.listen(PORT, () => console.log(`Server started at ${PORT}`))
