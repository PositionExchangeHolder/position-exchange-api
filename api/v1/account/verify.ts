import { VercelRequest, VercelResponse } from '@vercel/node'
import { getAddressFromSignature, getSignature, isAddress } from '../../../utils/address'
import { verifyDeadline } from '../../../utils/deadline'
import verifyAccount from '../../../jobs/firebase/verifyAccount'
import { generateBearerToken } from '../../../utils/jwt'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() !== 'POST') {
    return res.status(204).end()
  }

  try {
    const signature = getSignature(req)
    const address = getAddressFromSignature(signature)

    if (!address || !isAddress(address)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request: Invalid address'
        }
      })
    }

    if (!verifyDeadline(signature.message)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request: Deadline'
        }
      })
    }

    const nonce = await verifyAccount(address, signature)
    const token = generateBearerToken({ address, nonce })
    
    return res.status(200).json({
      success: true,
      address,
      token
    })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({
      error: {
        message: 'Unknown error.'
      }
    })
  }
}
