import { VercelRequest, VercelResponse } from '@vercel/node'
import { getLatestTransactionsOfAddress } from '../../../utils/bscscan'
import { POSITION_DEPLOYER_ADDRESS } from '../../../utils/constant'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const page = Number(req.query.page) || 1
    const offset = Number(req.query.offset) || 10
    const sort = req.query.sort || 'desc'

    const transactions = await getLatestTransactionsOfAddress(
      POSITION_DEPLOYER_ADDRESS,
      page,
      offset,
      sort.toString()
    )
    
    return res.status(200).json({
      page,
      offset,
      sort,
      total: transactions.length,
      transactions: transactions
    })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: { message: 'Unknown error.' } })
  }
}