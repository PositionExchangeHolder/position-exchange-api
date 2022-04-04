import { VercelRequest, VercelResponse } from '@vercel/node'
import { getTokenBalance, getTotalPosiBalance } from '../../../utils/balance'
import { getStakingBalanceAndPendingRewardOfNftPoolV2 } from '../../../utils/nftPool'
import { getStakingBalanceAndPendingRewardOfStakingPool } from '../../../utils/stakingPool'
import { validateQueryPoolPids } from '../../../utils/validate'

export default async (req: VercelRequest, res: VercelResponse): Promise<VercelResponse | void> => {
  if (req.method?.toUpperCase() === 'OPTIONS') {
    return res.status(204).end()
  }

  try {
    const address = req.query.address as string
    
    if (!address) {
      return res.status(404).json({ error: { message: 'Not found' } })
    }
    
    const balance = await getTokenBalance(address)
    let stakingPoolBalances
    let nftPoolBalance
    
    let data = { balance }
    
    const stakingPids = req.query.pid as string
    if (stakingPids) {
      const pidsArr = await validateQueryPoolPids(stakingPids.split(','))
      if (pidsArr.length > 0) {
        stakingPoolBalances = await getStakingBalanceAndPendingRewardOfStakingPool(pidsArr, address)
        data = { ...data, ...{ stakingPoolBalances } }
      }
    }

    const nftPools = req.query.nftPool as string
    if (nftPools === 'true') {
      nftPoolBalance = await getStakingBalanceAndPendingRewardOfNftPoolV2(address)
      data = { ...data, ...{ nftPoolBalance } }
    }

    const totalPosiBalance = getTotalPosiBalance(balance, stakingPoolBalances, nftPoolBalance)
    data = { ...data, ...{ totalPosiBalance } }

    return res.status(200).json({ data })
  } catch (error) {
    console.log({ error })
    return res.status(500).json({ error: { message: 'Unknown error.' } })
  }
}
