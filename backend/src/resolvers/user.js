import bcrypt from 'bcrypt'
import { Op } from 'sequelize'

import { createToken } from '../utilities/authentication'

import { formatError } from '../utilities/error'

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
      try {
        const user = await models.User.create({
          email,
          username,
          password,
        })
        return {
          success: true,
          message: `Successfully created user ${user.username}.`,
        }
      } catch (error) {
        // console.log(error)
        return {
          success: false,
          errors: formatError(error, models),
        }
      }
    },
    async login(parent, args, { models, SECRET, SECRET2 }, info) {
      const { emailOrUsername, password } = args
      try {
        const user = await models.User.findOne({
          where: {
            [Op.or]: [
              { email: emailOrUsername },
              { username: emailOrUsername },
            ],
          },
        })
        if (!user) {
          return {
            success: false,
            errors: [
              { path: 'user', message: 'No user record match the credentials' },
            ],
          }
        }
        const isPassword = await bcrypt.compare(password, user.password)
        if (!isPassword) {
          return {
            success: false,
            errors: [{ path: 'password', message: 'Password incorrect' }],
          }
        }
        // if password changes token expires automatically
        const refreshTokenSecret = user.password + SECRET2
        const { token, refreshToken } = await createToken(
          user,
          SECRET,
          refreshTokenSecret
        )
        return {
          success: true,
          message: 'Successfully logged in',
          token,
          refreshToken,
        }
      } catch (error) {
        // console.log(error)
        return {
          success: false,
          errors: formatError(error, models),
        }
      }
    },
  },
}
