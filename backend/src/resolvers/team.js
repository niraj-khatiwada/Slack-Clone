import { formatError } from '../utilities/error'

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
    },
  },
  Mutation: {
    async createTeam(parent, { name, owner }, { models }, info) {
      try {
        const user = await models.User.findOne({
          where: {
            id: owner,
          },
        })
        if (!user) {
          return {
            success: false,
            errors: [
              {
                path: 'owner',
                message: `No user exists for user id ${owner} supplied for owner`,
              },
            ],
          }
        }
        const team = await models.Team.create({ name, owner })
        return {
          success: true,
          message: `Successfully created team ${team.name}`,
        }
      } catch (error) {
        console.log(error)
        return { success: false, errors: formatError(error, models) }
      }
    },
  },
}
