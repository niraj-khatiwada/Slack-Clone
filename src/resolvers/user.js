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
            try {
                const user = await models.User.create({ ...args })
                return {
                    success: true, message: `Successfully created user ${user.username}.`
                }
            } catch (error) {
                console.log(error)
                return {
                    success: false,
                    message: error
                }
            }

        },
    },
}
