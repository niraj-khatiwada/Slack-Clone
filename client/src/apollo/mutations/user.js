import { gql } from '@apollo/client'

export const LOGIN = gql`
  mutation($emailOrUsername: String!, $password: String!) {
    login(emailOrUsername: $emailOrUsername, password: $password) {
      success
      message
      errors {
        path
        message
      }
      token
      refreshToken
    }
  }
`

export const SIGNUP = gql`
  mutation($email: String!, $username: String!, $password: String!) {
    createUser(email: $email, username: $username, password: $password) {
      success
      message
      errors {
        path
        message
      }
    }
  }
`
