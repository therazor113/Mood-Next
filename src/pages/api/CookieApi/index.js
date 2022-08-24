import { deleteCookie } from 'cookies-next'

const CookieApi = async (req, res) => {
  res.json(deleteCookie('jwt', { req, res }))
}

export default CookieApi
