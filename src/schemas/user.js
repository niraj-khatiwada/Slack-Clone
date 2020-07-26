import { gql } from "apollo-server-express"

export default gql`
type Query {
    user(id: Int!): User
    users: [User!]!
}
type Mutation{
    createUser(email: String!, username:String!, password: String!): BasicResponse!
}
type User {
    id: Int!
    email: String!
    username: String!
    teams:[Team!]!
}
scalar UserID
`
