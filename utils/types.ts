import BigNumber from 'bignumber.js'

/**
 * PID
 * 0: POSI-BUSD
 * 1: POSI
 * 2: POSI-WBNB
 * 3: Bond01
 * 4: Bond02
 * 5: Bond03
 */

export type StakingPool = {
  pid: string
  stakingBalance: BigNumber
  pendingReward: BigNumber
}

export type NftPool = {
  pool: 'v1' | 'v2'
  stakingBalance: BigNumber
  pendingReward: BigNumber
}
