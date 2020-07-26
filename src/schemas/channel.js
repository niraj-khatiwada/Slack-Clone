import { gql } from "apollo-server-express"

export default gql`
extend type Query {
    channel(id: Int!): Channel
    channels: [Channel!]!
}
extend type Mutation {
    createChannel(name: String!, teamID: TeamID, public: Boolean = false): BasicResponse!
}
type Channel {
    id: Int!,
    name: String!
    public: Boolean!
    teams:[Team!]!  
    messages:[Message!]!  
    users: [User!]!
}
scalar ChannelID
`
