import jsonwebtoken from 'jsonwebtoken'
import { json } from 'sequelize'

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
