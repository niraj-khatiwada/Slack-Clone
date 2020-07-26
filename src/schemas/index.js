export default `
type User {
    id: Int!
    email: String!
    username: String!
    teams:[Team!]!
}
type Channel {
    id: Int!,
    name: String!
    public: Boolean!
    teams:[Team!]!  
    messages:[Message!]!  
    users: [User!]!
}
type Team {
    id: Int!,
    name: String!,
    members:[User!]!
    owner: User!
    channels:[Channel!]
}
type Message {
    id: Int!
    text: String!
    user: User!

}
type Query {
    hello: String!
    user(id: Int!): User!
    users: [User!]!

}
type Mutation{
    createUser(email: String!, username:String!, password: String!): User!
}
`
