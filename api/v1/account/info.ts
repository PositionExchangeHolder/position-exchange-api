import { VercelRequest, VercelResponse } from '@vercel/node'
import { getAccountInfo } from '../../../jobs/firebase/getAccountInfo'
import { isAddress } from '../../../utils/address'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  try {
    let address = req.query.address as string
    
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request: Invalid address'
        }
      })
    }

    address = address.toLowerCase()
    const account = await getAccountInfo(address)

    if (!account) {
      return res.status(404).json({
        error: {
          message: 'Not found'
        }
      })
    }

    return res.status(200).json({
      success: true,
      data: account
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
