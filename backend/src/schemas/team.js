import { gql } from 'apollo-server-express'

export default gql`
  extend type Query {
    team(id: Int!): Team
    teams: [Team!]!
  }
  extend type Mutation {
    createTeam(name: String!): BasicResponse!
  }
  type Team {
    id: Int!
    name: String!
    members: [User!]!
    owner: User!
    channels: [Channel!]
  }
  scalar TeamId
`
