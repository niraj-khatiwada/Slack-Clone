export default {
  Query: {
    hello(parent, args, context, info) {
      return 'Hello World'
    },
    user(parent, { id }, { models }, info) {
      return models.User.findByPk(id)
    },
    users(parent, args, { models }, info) {
      return models.User.findAll()
    },
  },
  Mutation: {
    async createUser(parent, args, { models }, info) {
      return models.User.create({ ...args })
    },
  },
}
