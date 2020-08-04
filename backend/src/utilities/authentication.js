import jsonwebtoken from 'jsonwebtoken'

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
    console.log('decode', user)
    userID = user
  } catch (error) {
    return
  }
  if (!userID) {
    return
  }
  const user = await models.User.findOne({ where: { id: userID } })
  if (!user) {
    return
  }
  try {
    jsonwebtoken.verify(refreshToken, user.password + SECRET2)
  } catch (error) {
    return
  }
  try {
    const { newToken, newRefreshToken } = await createToken(
      user,
      SECRET,
      SECRET2
    )
    return {
      token: newToken,
      refreshToken: newRefreshToken,
      user,
    }
  } catch (error) {
    console.log('-----errrrrr----', error)
    return
  }
}
