import BigNumber from 'bignumber.js'
import { getPositionStakingPoolContract } from './contract'
import { StakingPool } from './types'

const getNameOfPoolByPid = (pid: number): string => {
  switch (pid) {
    case 0:
      return 'POSI-BUSD'
    case 1:
      return 'POSI'
    case 2:
      return 'POSI-WBNB'
    case 3:
      return 'Bond01'
    case 4:
      return 'Bond02'
    case 5:
      return 'Bond03'
    default:
      return ''
  }
}

export const getStakingBalance = async (
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

export const getPendingReward = async (
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
      const stakingBalance = await getStakingBalance(pid, address)
      const pendingReward = await getPendingReward(pid, address)
  
      return {
        pid,
        name: getNameOfPoolByPid(pid),
        stakingBalance,
        pendingReward
      }
    })
  )

  return balances
}
