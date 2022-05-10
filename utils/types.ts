import BigNumber from 'bignumber.js'

export type StakingPool = {
  pid: number
  stakingBalance: BigNumber
  pendingReward: BigNumber
}

export type NftPool = {
  pool: 'v1' | 'v2'
  stakingBalance: BigNumber
  pendingReward: BigNumber
}

export type BscScanTx = {
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
