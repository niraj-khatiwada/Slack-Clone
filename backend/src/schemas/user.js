import { gql } from 'apollo-server-express'

export default gql`
  type Query {
    user(id: Int!): User
    users: [User!]!
    isAuthenticated(token: String!, refreshToken: String!): BasicResponse!
  }
  type Mutation {
    createUser(
      email: String!
      username: String!
      password: String!
    ): BasicResponse!
    login(emailOrUsername: String!, password: String!): LoginResponse!
  }
  type User {
    id: Int!
    email: String!
    username: String!
    teams: [Team!]!
  }
  scalar UserId
  type LoginResponse {
    success: Boolean!
    message: String
    token: String
    refreshToken: String
    errors: [ErrorResponse!]
  }
`
