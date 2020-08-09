import { gql } from '@apollo/client'

export const checkAuth = gql`
  query($token: String!, $refreshToken: String!) {
    isAuthenticated(token: $token, refreshToken: $refreshToken) {
      success
      message
      errors {
        path
        message
      }
    }
  }
`
