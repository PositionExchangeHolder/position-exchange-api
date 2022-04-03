import BigNumber from 'bignumber.js'

export const convertBigNumberToNumber = (bigNumber: BigNumber): number => {
  return Number(bigNumber.div(1e18).toString())
}
