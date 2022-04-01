import Web3 from 'web3'

const MAINNET_RPC = 'https://bsc-dataseed.binance.org/'

const web3 = new Web3(new Web3.providers.HttpProvider(MAINNET_RPC))

export default web3
