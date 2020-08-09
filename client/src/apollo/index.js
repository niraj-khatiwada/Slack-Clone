import { ApolloClient, InMemoryCache, ApolloLink } from '@apollo/client'
import { createHttpLink } from '@apollo/react-hooks'
import { onError } from '@apollo/client/link/error'

const httpLink = createHttpLink({
  uri: 'http://localhost:5000/graphql',
})

const authorizationLink = new ApolloLink((operation, forward) => {
  const token = localStorage.getItem('token')
  const refreshToken = localStorage.getItem('refreshToken')

  operation.setContext(({ headers }) => ({
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.replace(/"/g, '')}` : '',
      'x-refresh-token': refreshToken ? refreshToken : '',
    },
  }))

  return forward(operation)
})

const parseResponse = new ApolloLink((operation, forward) => {
  return forward(operation).map((response) => {
    const {
      response: { headers },
    } = operation.getContext()
    const newToken = headers.get('x-token')
    const newRefreshToken = headers.get('x-refresh-token')
    if (!!newToken && !!newRefreshToken) {
      localStorage.setItem('token', newToken)
      localStorage.setItem('refreshToken', newRefreshToken)
    }
    return response
  })
})

const globalErrorLink = onError(
  ({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors.message === 'UNAUTHENTICATED') {
      operation.setContext(({ headers }) => ({
        ...headers,
        authenticated: false,
      }))
    }
  }
)

export default new ApolloClient({
  link: authorizationLink
    .concat(parseResponse)
    .concat(globalErrorLink)
    .concat(httpLink),
  cache: new InMemoryCache(),
})
