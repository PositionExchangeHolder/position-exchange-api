import { POSI_LP_PAIR_ADDRESSES } from './constant'
import { getLpReserves } from './liquidityPair'

export const getPrices = async (): Promise<{
  pair: string,
  price: string
}[]> => {
  const prices = POSI_LP_PAIR_ADDRESSES.map(async pair => {
    const lpReserves = await getLpReserves(pair.address)
    const { reserve0, reserve1 } = lpReserves
    
    return {
      pair: pair.name,
      price: reserve1.div(reserve0).toString()
    }
  })

  return Promise.all(prices)
}
