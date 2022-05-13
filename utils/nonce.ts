import crypto from 'crypto'

export const generateNonce = (): string => {
  const nonce = crypto.randomBytes(16).toString('base64')
  return nonce
}
