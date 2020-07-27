import React from 'react'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from '@apollo/react-hooks'
import { Route, Switch } from 'react-router-dom'

import Home from './components/Home.component'

const client = new ApolloClient({
  uri: 'localhost:5000/graphql',
})

const App = () => (
  <ApolloProvider client={client}>
    <Switch>
      <Route exact path="/" component={Home} />
    </Switch>
  </ApolloProvider>
)

export default App
