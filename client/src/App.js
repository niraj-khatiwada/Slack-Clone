import React from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'

import { useQuery } from '@apollo/react-hooks'
import { checkAuth } from './apollo/queries/user'

import client from './apollo'

import Login from './components/Login'
import SignUp from './components/Register'
import Home from './components/Home'
import CreateTeam from './components/Teams/CreateTeam.component'

const ProtectedRoute = ({ component: Component, ...otherProps }) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')
  return (
    <Route
      {...otherProps}
      render={(props) =>
        token || refreshToken ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/login' }} />
        )
      }
    />
  )
}

const App = () => (
  <ApolloProvider client={client}>
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/signup" component={SignUp} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/createTeam" component={CreateTeam} />
      <Route render={() => <h1>Page not found</h1>} />
    </Switch>
  </ApolloProvider>
)

export default App
