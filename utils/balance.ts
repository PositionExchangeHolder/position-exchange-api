import BigNumber from 'bignumber.js'
import { ZERO_BIGNUMBER } from './constant'
import { getPositionTokenContract } from './contract'
import { NftPool, StakingPool } from './types'

export const getTokenBalance = async (
  address: string
): Promise<BigNumber> => {
  const positionToken = getPositionTokenContract()
  const balance = await positionToken
    .methods
    .balanceOf(address)
    .call()

  return new BigNumber(balance)
}

export const getTotalPosiBalance = (
  walletBalance: BigNumber,
  stakingPools?:
  StakingPool[],
  nftPool?: NftPool
): {
  total: BigNumber,
  walletBalance: BigNumber,
  stakingBalance: BigNumber,
  pendingBalance: BigNumber
} => {
  let totalPosiStaking: BigNumber = ZERO_BIGNUMBER
  let totalPosiPending: BigNumber = ZERO_BIGNUMBER
  
  if (stakingPools) {
    for (let i = 0; i < stakingPools.length; i++) {
      const pool = stakingPools[i]
      if (pool.pid === 1) {
        totalPosiStaking = totalPosiStaking.plus(pool.stakingBalance)
      }

      totalPosiPending = totalPosiPending.plus(pool.pendingReward)
    }
  }
  if (nftPool) {
    totalPosiStaking = totalPosiStaking.plus(nftPool.stakingBalance)
    totalPosiPending = totalPosiPending.plus(nftPool.pendingReward)
  }

  const total = {
    total: walletBalance.plus(totalPosiStaking).plus(totalPosiPending),
    walletBalance: walletBalance,
    stakingBalance: totalPosiStaking,
    pendingBalance: totalPosiPending
  }

  return total
}
