export default {
    Query: {
        async team(parent, { id }, { models }, info) {
            try {
                const team = await models.Team.findByPk(id)
                return team
            } catch (error) {
                console.log(error)
            }
        },
        async teams(parent, args, { models }, info) {
            try {
                const teams = await models.Team.findAll()
                return teams
            } catch (error) {
                console.log(error)
            }

            return
        },
    },
    Mutation: {
        createTeam(parent, args, { models }, info) {
            try {
                const team = models.Team.create({ ...args })
                return { success: true, message: `Successfully created team ${team.name}` }
            } catch (error) {
                console.log(error)
                return { success: false, message: error }
            }
        },
    },
}
