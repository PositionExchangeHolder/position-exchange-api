import axios from 'axios'
import { ENDPOINT } from './constants'

export const queryRealizePnlOfAddress = async (address: string) => {
  try {
    const query = `
      {
        user(id: "${address.toLowerCase()}") {
          realizedPnl
          totalTokensBuy
          totalTokensSell
          totalVolumeInBUSD
          totalTransactions
          createdBlockNumber
          createdTimestamp
          updatedTimestamp
        }
      }
    `
    const res = await axios.post(ENDPOINT.POSITION_TOKEN, { query })
  
    return res.data?.data
  } catch (error) {
    console.log(error)
    return undefined
  }
}
