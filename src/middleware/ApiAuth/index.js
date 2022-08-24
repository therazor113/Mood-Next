import { getCookie } from 'cookies-next'
import jwt from 'jsonwebtoken'

const authUser = (req, res) => {
  const token = getCookie('jwt', req, res)

  if (token) {
    return jwt.verify(token, process.env.AUTH_SECRET, (err, openToken) => {
      if (err) {
        return false
      }
      return openToken
    })
  } else {
    return false
  }
}

const maxAge = 3 * 24 * 60 * 60
const createToken = (userid, name) => {
  return jwt.sign({ userid, name }, process.env.AUTH_SECRET, {
    expiresIn: maxAge
  })
}

export { authUser, createToken, maxAge }
