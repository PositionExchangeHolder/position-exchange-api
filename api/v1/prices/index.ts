import { VercelRequest, VercelResponse } from '@vercel/node'
import { getPrices } from '../../../utils/getPrices'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const positionTokenPrices = await getPrices()
    return res.status(200).json({ prices: positionTokenPrices })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: { message: 'Unknown error.' } })
  }
}
