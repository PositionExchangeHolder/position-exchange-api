import jwt from 'jsonwebtoken'
import { JwtAccountPayload } from './types'

const JWT_SECRET_TOKEN = process.env.JWT_SECRET_TOKEN || 'you_can_not_see_my_token'

export const generateBearerToken = (payload: object): string => {
  const token = jwt.sign(payload, JWT_SECRET_TOKEN)

  return token
}

export const verifyBearerToken = (token: string) => {
  const payload = jwt.verify(token, JWT_SECRET_TOKEN)

  return payload as JwtAccountPayload
}
