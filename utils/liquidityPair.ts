import BigNumber from 'bignumber.js'
import { getLpPairContract } from './contract'

export const getLpReserves = async (lpAddress: string): Promise<{
  reserve0: BigNumber,
  reserve1: BigNumber
}> => {
  const lpContract = getLpPairContract(lpAddress)
  const reserves = await lpContract.methods.getReserves().call()
  
  return {
    reserve0: new BigNumber(reserves[0]),
    reserve1: new BigNumber(reserves[1])
  }
}

export const getLpTotalSupply = async (lpAddress: string): Promise<BigNumber> => {
  const lpContract = getLpPairContract(lpAddress)
  const totalSupply = await lpContract.methods.totalSupply().call()

  return new BigNumber(totalSupply)
}
