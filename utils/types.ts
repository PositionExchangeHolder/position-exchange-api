import BigNumber from 'bignumber.js'

export type StakingPool = {
  pid: number
  stakingBalance: BigNumber
  pendingReward: BigNumber
}

export type NftPool = {
  pool: 'v1' | 'v2'
  stakingBalance: BigNumber
  pendingReward: BigNumber
}
