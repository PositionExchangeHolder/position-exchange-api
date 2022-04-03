import BigNumber from 'bignumber.js'
import { ZERO_BIGNUMBER } from './constant'
import { getPositionTokenContract } from './contract'
import { NftPool, StakingPool } from './types'

export const getTokenBalance = async (address: string): Promise<BigNumber> => {
  const positionToken = getPositionTokenContract()
  const balance = await positionToken.methods.balanceOf(address).call()

  return new BigNumber(balance)
}

export const getTotalPosiBalance = (walletBalance: BigNumber, stakingPools?: StakingPool[], nftPool?: NftPool): BigNumber => {
  let totalStakingPoolsBalance: BigNumber = ZERO_BIGNUMBER
  let totalNftPoolBalance: BigNumber = ZERO_BIGNUMBER
  
  if (stakingPools) {
    for (let i = 0; i < stakingPools.length; i++) {
      const pool = stakingPools[i]
      if (pool.pid === '1') {
        totalStakingPoolsBalance = totalStakingPoolsBalance
          .plus(pool.stakingBalance
          .plus(pool.pendingReward))
      }

      totalStakingPoolsBalance = totalStakingPoolsBalance.plus(pool.pendingReward)
    }
  }
  if (nftPool) {
    totalNftPoolBalance = nftPool.stakingBalance.plus(nftPool.pendingReward)
  }

  return (
    walletBalance
    .plus(totalStakingPoolsBalance)
    .plus(totalNftPoolBalance)
  )
}
