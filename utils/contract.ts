import web3 from './web3'
import {
  POSITION_NFT_REWARD_POOL_V1_ADDRESS,
  POSITION_NFT_REWARD_POOL_V2_PROXY_ADDRESS,
  POSITION_STAKING_POOL_ADDRESS,
  POSITION_TOKEN_ADDRESS
} from './constant'
import {
  PancakePairABI,
  PositionNFTRewardPoolV1ABI,
  PositionNFTRewardPoolV2ABI,
  PositionStakingManagerABI,
  PositionTokenABI
} from './abis'

const getContract = (address: string, abi: any) => {
  return new web3.eth.Contract(abi, address)
}

export const getPositionTokenContract = () => {
  return getContract(POSITION_TOKEN_ADDRESS, PositionTokenABI)
}

export const getLpPairContract = (lpAddress: string) => {
  return getContract(lpAddress, PancakePairABI)
}

export const getPositionStakingPoolContract = () => {
  return getContract(POSITION_STAKING_POOL_ADDRESS, PositionStakingManagerABI)
}

export const getPositionNftRewardPoolV1Contract = () => {
  return getContract(POSITION_NFT_REWARD_POOL_V1_ADDRESS, PositionNFTRewardPoolV1ABI)
}

export const getPositionNftRewardPoolV2Contract = () => {
  return getContract(POSITION_NFT_REWARD_POOL_V2_PROXY_ADDRESS, PositionNFTRewardPoolV2ABI)
}
