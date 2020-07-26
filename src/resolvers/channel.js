export default {
    Query: {
        async channel(parent, { id }, { models }, info) {
            try {
                const channel = await models.Channel.findByPk(id)
                return channel
            } catch (error) {
                console.log(error)
            }
        },
        async channels(parent, args, { models }, info) {
            try {
                const channels = await models.Channel.findAll()
                return channels
            } catch (error) {
                console.log(error)
            }

        },
    },
    Mutation: {
        createChannel(parent, args, { models }, info) {
            try {
                const channel = models.Channel.create({ ...args })
                return { success: true, message: `Successfully created channel ${channel.name}` }
            } catch (error) {
                console.log(error)
                return { success: false, message: error }
            }
        },
    },
}
