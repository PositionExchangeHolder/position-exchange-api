import BigNumber from 'bignumber.js'

export const POSITION_TOKEN_ADDRESS = '0x5ca42204cdaa70d5c773946e69de942b85ca6706'
export const POSI_LP_PAIR_ADDRESSES = [
  {
    name: 'POSI/BUSD',
    address: '0x00222d964a2077301309809ab3bf56485c126a9c'
  },
  {
    name: 'POSI/WBNB',
    address: '0x254baa324a7e8876f4d51c3eff4b962f16672c5f'
  }
]

export const POSITION_DEPLOYER_ADDRESS = '0xa3772e9b69b5877dde7580d17ae9716d228aafde'
export const POSITION_STAKING_POOL_ADDRESS = '0x0c54b0b7d61de871db47c3ad3f69feb0f2c8db0b'
export const POSITION_NFT_REWARD_POOL_V1_ADDRESS = '0xbe9ff181bfa9dd78191b81b23fd4ff774a3fb4f1'
export const POSITION_NFT_REWARD_POOL_V2_PROXY_ADDRESS = '0x6257229fa379afdbb91732091b5de32cdb759845'

export const ZERO_BIGNUMBER = new BigNumber(0)

export const DB_FIREBASE = {
  COLLECTIONS: {
    ACCOUNT_INFO: 'account-info'
  }
}
