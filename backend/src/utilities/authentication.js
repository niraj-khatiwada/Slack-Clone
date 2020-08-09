import jsonwebtoken from 'jsonwebtoken'
import { raw } from 'body-parser'

export const createToken = async (user, SECRET, SECRET2) => {
  const token = jsonwebtoken.sign(
    {
      user: user.id,
    },
    SECRET,
    { expiresIn: '1h' }
  )
  const refreshToken = jsonwebtoken.sign(
    {
      user: user.id,
    },
    SECRET2,
    {
      expiresIn: '7d',
    }
  )
  return { token, refreshToken }
}

export const refreshToken = async (
  token,
  refreshToken,
  models,
  SECRET,
  SECRET2
) => {
  let userID
  try {
    const { user } = jsonwebtoken.decode(refreshToken)
    userID = user
  } catch (error) {
    return
  }
  if (!userID) {
    return
  }
  const user = await models.User.findOne({ where: { id: userID }, raw: true })
  if (!user) {
    return
  }
  try {
    jsonwebtoken.verify(refreshToken, user.password + SECRET2)
  } catch (error) {
    return
  }
  try {
    const {
      token: newToken,
      refreshToken: newRefreshToken,
    } = await createToken(user, SECRET, SECRET2)
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    }
  } catch (error) {
    return
  }
}
