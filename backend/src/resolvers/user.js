import bcrypt from 'bcrypt'

export default {
  Query: {
    user(parent, { id }, { models }, info) {
      return models.User.findByPk(id)
    },
    users(parent, args, { models }, info) {
      return models.User.findAll()
    },
  },
  Mutation: {
    async createUser(parent, args, { models }, info) {
      const { email, username, password } = args
      const hashedPassword = await bcrypt.hash(password, 10)
      try {
        const user = await models.User.create({
          email,
          username,
          password: hashedPassword,
        })
        return {
          success: true,
          message: `Successfully created user ${user.username}.`,
        }
      } catch (error) {
        console.log(error)
        return {
          success: false,
          message: error,
        }
      }
    },
  },
}
