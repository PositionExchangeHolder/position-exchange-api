import { VercelRequest, VercelResponse } from '@vercel/node'
import { isAddress } from '../../../utils/address'
import { queryRealizePnlOfAddress } from '../../../query'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const address = req.query.address as string
    
    if (!address || !isAddress(address)) {
      return res.status(400).json({
        error: {
          message: 'Bad Request: Invalid address'
        }
      })
    }
    
    const pnl = await queryRealizePnlOfAddress(address)

    if (!pnl) {
      return res.status(500).json({
        success: false
      }) 
    }

    return res.status(200).json({
      success: true,
      address,
      data: pnl
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