import { VercelRequest, VercelResponse } from '@vercel/node'
import { isAddress } from '../../../utils/address'
import { getTokenBalance, getTotalPosiBalance } from '../../../utils/balance'
import { getStakingBalanceAndPendingRewardOfNftPools } from '../../../utils/nftPool'
import { getStakingBalanceAndPendingRewardOfStakingPool } from '../../../utils/stakingPool'
import { getStakingAndPendingTokenOnVaults } from '../../../utils/vault'

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
    
    const [
      walletBalance,
      stakingPoolBalances,
      nftPoolBalances,
      vaultBalances
    ] = await Promise.all([
      await getTokenBalance(address),
      await getStakingBalanceAndPendingRewardOfStakingPool(address),
      await getStakingBalanceAndPendingRewardOfNftPools(address),
      await getStakingAndPendingTokenOnVaults(address)
    ])
    
    const totalPosiBalance = getTotalPosiBalance(
      walletBalance,
      stakingPoolBalances,
      nftPoolBalances,
      vaultBalances
    )

    const data = {
      walletBalance,
      stakingPoolBalances,
      nftPoolBalances,
      vaultBalances,
      totalPosiBalance
    }

    return res.status(200).json({ data })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: { message: 'Unknown error.' } })
  }
}
