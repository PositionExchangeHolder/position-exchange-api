import BigNumber from 'bignumber.js'
import { getPositionStakingPoolContract } from './contract'
import { StakingPool } from './types'

export const getStakingBalance = async (
  pid: string,
  address: string
): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const stakingBalance = await positionStakingPoolContract
    .methods
    .userInfo(pid, address)
    .call()
  
  return new BigNumber(stakingBalance.amount)
}

export const getPendingReward = async (
  pid: string,
  address: string
): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const pendingReward = await positionStakingPoolContract
    .methods
    .pendingPosition(pid, address)
    .call()
  
  return new BigNumber(pendingReward)
}

export const getPoolLength = async (): Promise<number> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const poolLength = await positionStakingPoolContract
    .methods
    .poolLength()
    .call()

  return Number(poolLength)
}

export const getStakingBalanceAndPendingRewardOfStakingPool = async (
  address: string
): Promise<StakingPool[]> => {
  const poolLength = await getPoolLength()

  const balances = Promise.all(
    Array.from(Array(poolLength).keys()).map(async pid => {
      const stakingBalance = await getStakingBalance(pid.toString(), address)
      const pendingReward = await getPendingReward(pid.toString(), address)
  
      return {
        pid: pid.toString(),
        stakingBalance,
        pendingReward
      }
    })
  )

  return balances
}
