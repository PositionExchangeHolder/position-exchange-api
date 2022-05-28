import BigNumber from 'bignumber.js'
import { POOLS } from './constant'
import { getPositionStakingPoolContract } from './contract'
import { StakingPool } from './types'

const getStakingBalance = async (
  pid: number,
  address: string
): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const stakingBalance = await positionStakingPoolContract
    .methods
    .userInfo(pid, address)
    .call()
  
  return new BigNumber(stakingBalance.amount)
}

const getPendingReward = async (
  pid: number,
  address: string
): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const pendingReward = await positionStakingPoolContract
    .methods
    .pendingPosition(pid, address)
    .call()
  
  return new BigNumber(pendingReward)
}

export const getStakingBalanceAndPendingRewardOfStakingPool = async (
  address: string
): Promise<StakingPool[]> => {

  const balances = Promise.all(
    POOLS.map(async pool => {
      const { pid, name } = pool
      const stakingBalance = await getStakingBalance(pid, address)
      const pendingReward = await getPendingReward(pid, address)
  
      return {
        pid,
        name,
        stakingBalance,
        pendingReward
      }
    })
  )

  return balances
}
