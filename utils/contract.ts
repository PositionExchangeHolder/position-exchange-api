import web3 from './web3'
import { POSITION_TOKEN_ADDRESS } from './constant'
import PositionTokenABI from './abis/PositionToken.json'
import PancakePairABI from './abis/PancakePair.json'

const getContract = (address: string, abi: any) => {
  return new web3.eth.Contract(abi, address)
}

export const getPositionTokenContract = () => {
  return getContract(POSITION_TOKEN_ADDRESS, PositionTokenABI)
}

export const getPositionTokenLpPairContract = (lpAddress: string) => {
  return getContract(lpAddress, PancakePairABI)
}
