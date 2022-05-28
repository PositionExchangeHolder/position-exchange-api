import BigNumber from 'bignumber.js'
import { VAULTS, ZERO_BIGNUMBER } from './constant'
import { getVaultContract } from './contract'
import { StakingPool } from './types'

const getStaking = async (
  vault: string,
  address: string
): Promise<BigNumber> => {
  const vaultContract = getVaultContract(vault)
  if (!vaultContract) {
    return ZERO_BIGNUMBER
  }
  
  const staking = await vaultContract
    .methods
    .lpOf(address)
    .call()

  return new BigNumber(staking)
}

const getPending = async (
  vault: string,
  address: string
): Promise<BigNumber> => {
  const vaultContract = getVaultContract(vault)
  if (!vaultContract) {
    return ZERO_BIGNUMBER
  }

  const pending = await vaultContract
    .methods
    .pendingEarned(address)
    .call()

  return new BigNumber(pending)
}

export const getStakingAndPendingTokenOnVaults = async (
  address: string
): Promise<StakingPool[]> => {
  const balances = Promise.all(
    VAULTS.map(async vault => {
      const { name } = vault
      const stakingBalance = await getStaking(name, address)
      const pendingReward = await getPending(name, address)

      return {
        pid: `v${name}`,
        name: `Vault ${name}`,
        stakingBalance,
        pendingReward
      }
    })
  )

  return balances
}
