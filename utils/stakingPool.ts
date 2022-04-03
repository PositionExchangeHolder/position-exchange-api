import BigNumber from 'bignumber.js'
import { getPositionStakingPoolContract } from './contract'
import { StakingPool } from './types'

export const getStakingBalance = async (pid: string, address: string): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const stakingBalance = await positionStakingPoolContract.methods.userInfo(pid, address).call()
  
  return new BigNumber(stakingBalance.amount)
}

export const getPendingReward = async (pid: string, address: string): Promise<BigNumber> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const pendingReward = await positionStakingPoolContract.methods.pendingPosition(pid, address).call()
  
  return new BigNumber(pendingReward)
}

export const getPoolLength = async (): Promise<number> => {
  const positionStakingPoolContract = getPositionStakingPoolContract()
  const poolLength = await positionStakingPoolContract.methods.poolLength().call()

  return Number(poolLength)
}

export const getStakingBalanceAndPendingRewardOfStakingPool = async (pids: string[], address: string): Promise<StakingPool[]> => {
  const balances = Promise.all(
    pids.map(async pid => {
      const stakingBalance = await getStakingBalance(pid, address)
      const pendingReward = await getPendingReward(pid, address)
  
      return {
        pid,
        stakingBalance,
        pendingReward
      }
    })
  )

  return balances
}
