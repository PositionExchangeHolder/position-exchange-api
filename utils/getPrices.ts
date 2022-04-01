import { BigNumber } from 'bignumber.js'
import { POSI_LP_PAIR_ADDRESSES } from './constant'
import { getPositionTokenLpPairContract } from './contract'

const getLpReserves = async (lpContract: any): Promise<{
  reserve0: BigNumber,
  reserve1: BigNumber
}> => {
  const reserves = await lpContract.methods.getReserves().call()
  
  return {
    reserve0: new BigNumber(reserves[0]),
    reserve1: new BigNumber(reserves[1])
  }
}

export const getPrices = async (): Promise<{
  pair: string,
  price: string
}[]> => {
  const prices = POSI_LP_PAIR_ADDRESSES.map(async pair => {
    const lpPair = getPositionTokenLpPairContract(pair.address)
    const lpReserves = await getLpReserves(lpPair)
    const { reserve0, reserve1 } = lpReserves
    
    return {
      pair: pair.name,
      price: reserve1.div(reserve0).toString()
    }
  })

  return Promise.all(prices)
}
