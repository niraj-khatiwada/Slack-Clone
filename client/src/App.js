import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { ApolloClient, InMemoryCache } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'
import { ApolloProvider, createHttpLink } from '@apollo/react-hooks'

import Home from './components/Home.component'
import Login from './components/Login.component'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authorizationLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const client = new ApolloClient({
  link: authorizationLink.concat(httpLink),
  cache: new InMemoryCache(),
})

const App = () => (
  <ApolloProvider client={client}>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
    </Switch>
  </ApolloProvider>
)

export default App
