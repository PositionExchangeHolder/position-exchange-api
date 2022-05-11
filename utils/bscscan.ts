import axios from 'axios'
import { getTextSignature } from './4bytes'
import { BscScanTx } from './types'

const getBscScanApi = (
  address: string,
  page: number,
  offset: number,
  sort: string,
  startblock = 0,
  endblock = 99999999
): string => {
  const BSCSCAN_API_KEY =  process.env.BSCSCAN_API_KEY

  return `https://api.bscscan.com/api?module=account&action=txlist`
    + `&address=${address}`
    + `&startblock=${startblock}`
    + `&endblock=${endblock}`
    + `&page=${page}`
    + `&offset=${offset}`
    + `&sort=${sort}`
    + `&apikey=${BSCSCAN_API_KEY}`
}

export const getLatestTransactionsOfAddress = async (
  address: string,
  page: number,
  offset: number,
  sort: string
): Promise<BscScanTx[]> => {
  const api = getBscScanApi(address, page, offset, sort)
  const res = await axios.get(api)
  const { data } = res

  if (!data.result) {
    return []
  }
  
  const transactions = await Promise.all(
    data.result.map(async (tx: BscScanTx): Promise<BscScanTx> => {
      const textSignature = await getTextSignature(tx.input?.slice(0, 8))
      return {
        ...tx,
        textSignature
      }
    })
  )
  
  return transactions
}
