import { VercelRequest } from '@vercel/node'
import { Signature } from './types'
import web3 from './web3'

export const isAddress = (address: string): boolean => {
  return web3.utils.isAddress(address)
}

export const getAddressFromSignature = (signature: Signature): string => {
  if (!signature.messageHash
    || !signature.r
    || !signature.s
    || !signature.v
    || !signature.signature
  ) {
    return ''
  }
  
  return web3.eth.accounts.recover(signature).toLowerCase()
}

export const getSignature = (req: VercelRequest): Signature => {
  return {
    message: req.body.message,
    messageHash: req.body.messageHash,
    v: req.body.v,
    r: req.body.r,
    s: req.body.s,
    signature: req.body.signature
  }
}
