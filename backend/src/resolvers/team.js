import { formatError } from '../utilities/error'
import { requiresAuth } from '../utilities/permissions'

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
    createTeam: requiresAuth.createResolver(
      async (parent, { name }, { models, _user }, info) => {
        console.log('Logged in user', _user)
        try {
          const user = await models.User.findOne({
            where: {
              id: _user,
            },
          })
          if (!user) {
            return {
              success: false,
              errors: [
                {
                  path: 'owner',
                  message: `No user exists for user id ${_user} supplied for owner`,
                },
              ],
            }
          }

          const team = await models.Team.create({ name, owner: _user })
          return {
            success: true,
            message: `Successfully created team ${team.name}`,
          }
        } catch (error) {
          console.log(error)
          return { success: false, errors: formatError(error, models) }
        }
      }
    ),
  },
}
