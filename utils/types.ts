import BigNumber from 'bignumber.js'

export interface StakingPool {
  pid: number | string
  name: string
  stakingBalance: BigNumber
  pendingReward: BigNumber
}

export interface NftPool extends StakingPool {

}

export interface BscScanTx {
  blockNumber: string
  timeStamp: string
  hash: string
  nonce: string,
  blockHash: string
  transactionIndex: string
  from: string
  to: string
  value: string
  gas: string
  gasPrice: string
  isError: string
  txreceipt_status: string
  input: string
  contractAddress?: string
  cumulativeGasUsed: string
  gasUsed: string
  confirmations: string
  textSignature?: string
}

export interface Signature {
  message: string
  messageHash: string
  v: string
  r: string
  s: string
  signature: string
}

export interface AccountSchema {
  address: string
  signature?: string
  nonce?: string
  active: boolean
  created_at: number
  updated_at: number
  // Info
  name?: string
  email?: string
  github?: string
  twitter?: string
  ref?: string
}

export interface JwtAccountPayload {
  address: string
  nonce: string
  iat: number
}
