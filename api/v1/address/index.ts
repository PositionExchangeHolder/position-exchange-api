import { VercelRequest, VercelResponse } from '@vercel/node'
import { getTokenBalance, getTotalPosiBalance } from '../../../utils/balance'
import { getStakingBalanceAndPendingRewardOfNftPoolV2 } from '../../../utils/nftPool'
import { getStakingBalanceAndPendingRewardOfStakingPool } from '../../../utils/stakingPool'

export default async (req: VercelRequest, res: VercelResponse): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const address = req.query.address as string
    
    if (!address) {
      return res.status(404).json({ error: { message: 'Not found' } })
    }
    
    const [
      walletBalance,
      stakingPoolBalances,
      nftPoolBalance
    ] = await Promise.all([
      await getTokenBalance(address),
      await getStakingBalanceAndPendingRewardOfStakingPool(address),
      await getStakingBalanceAndPendingRewardOfNftPoolV2(address)
    ])
    
    const totalPosiBalance = getTotalPosiBalance(
      walletBalance,
      stakingPoolBalances,
      nftPoolBalance
    )

    const data = {
      walletBalance,
      stakingPoolBalances,
      nftPoolBalance,
      totalPosiBalance
    }

    return res.status(200).json({ data })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: { message: 'Unknown error.' } })
  }
}
