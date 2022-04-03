import BigNumber from 'bignumber.js'
import { getPositionNftRewardPoolV1Contract, getPositionNftRewardPoolV2Contract } from './contract'
import { NftPool } from './types'

export const getStakingBalanceV1 = async (address: string): Promise<BigNumber> => {
  const nftRewardPoolV1 = getPositionNftRewardPoolV1Contract()
  const stakingBalance = await nftRewardPoolV1.methods._degoBalances(address).call()

  return new BigNumber(stakingBalance)
}

export const getPendingRewardV1 = async (address: string): Promise<BigNumber> => {
  const nftRewardPoolV1 = getPositionNftRewardPoolV1Contract()
  const pendingReward = await nftRewardPoolV1.methods.earned(address).call()

  return new BigNumber(pendingReward)
}

export const getStakingBalanceAndPendingRewardOfNftPoolV1 = async (address: string): Promise<NftPool> => {
  const [stakingBalance, pendingReward] = await Promise.all([
    await getStakingBalanceV1(address),
    await getPendingRewardV1(address)
  ])

  return {
    pool: 'v1',
    stakingBalance,
    pendingReward
  }

}

export const getStakingBalanceV2 = async (address: string): Promise<BigNumber> => {
  const nftRewardPoolV2 = getPositionNftRewardPoolV2Contract()
  const stakingBalance = await nftRewardPoolV2.methods._degoBalances(address).call()

  return new BigNumber(stakingBalance)
}

export const getPendingRewardV2 = async (address: string): Promise<BigNumber> => {
  const nftRewardPoolV2 = getPositionNftRewardPoolV2Contract()
  const pendingReward = await nftRewardPoolV2.methods.earned(address).call()

  return new BigNumber(pendingReward)
}

export const getStakingBalanceAndPendingRewardOfNftPoolV2 = async (address: string): Promise<NftPool> => {
  const [stakingBalance, pendingReward] = await Promise.all([
    await getStakingBalanceV2(address),
    await getPendingRewardV2(address)
  ])

  return {
    pool: 'v2',
    stakingBalance,
    pendingReward
  }
}
