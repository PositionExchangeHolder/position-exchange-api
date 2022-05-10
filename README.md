# Position Exchange API

Serverless API implementation for Position Token Prices and Account Balances

## Development
```bash
$ vercel dev
```

## APIs

### Prices
```
GET /api/v1/prices
```

**Response**
```json
{
  "prices": [
    {
      "pair": "POSI/BUSD",
      "price": "1.17918666608890329619"
    },
    {
      "pair": "POSI/WBNB",
      "price": "0.00263900877467852335"
    }
  ]
}
```

### Account Balances
```
GET /api/v1/address/{{address}}
```

**Response**

```json
{
  "data": {
    "balance": "3.856102266623459808087e+21",
    "stakingPoolBalances": [
      {
        "pid": "0",
        "stakingBalance": "0",
        "pendingReward": "0"
      },
      {
        "pid": "1",
        "stakingBalance": "0",
        "pendingReward": "0"
      },
      {
        "pid": "2",
        "stakingBalance": "0",
        "pendingReward": "0"
      },
      {
        "pid": "3",
        "stakingBalance": "0",
        "pendingReward": "0"
      },
      {
        "pid": "4",
        "stakingBalance": "0",
        "pendingReward": "0"
      },
      {
        "pid": "5",
        "stakingBalance": "0",
        "pendingReward": "0"
      }
    ],
    "nftPoolBalance": {
      "pool": "v2",
      "stakingBalance": "200000000000000000000",
      "pendingReward": "15239747273991635813"
    },
    "totalPosiBalance": {
      "total": "4.0713420138974514439e+21",
      "walletBalance": "3.856102266623459808087e+21",
      "stakingBalance": "200000000000000000000",
      "pendingBalance": "15239747273991635813"
    }
  }
}
```

### Get Transactions of Deployer
```
GET /api/v1/deployer/transactions
```

**Response**

```json
{
  "page": 1,
  "offset": 2,
  "sort": "desc",
  "total": 2,
  "transactions": [
    {
      "blockNumber": "17630737",
      "timeStamp": "1652030105",
      "hash": "0x2ed3a514f8b6a5f0fc8bf8717b0fa7104583d0d09b69ee4904f6a87bb95049b3",
      "nonce": "6946",
      "blockHash": "0x78c175013469d0afebb23b239037e028e3b94b8ad238050235d5b71a7e942e1c",
      "transactionIndex": "109",
      "from": "0xa3772e9b69b5877dde7580d17ae9716d228aafde",
      "to": "0x0c54b0b7d61de871db47c3ad3f69feb0f2c8db0b",
      "value": "0",
      "gas": "2000000",
      "gasPrice": "5000000000",
      "isError": "1",
      "txreceipt_status": "0",
      "input": "0x0ba84cd20000000000000000000000000000000000000000000000005ce360e32b1f4000",
      "contractAddress": "",
      "cumulativeGasUsed": "15613833",
      "gasUsed": "1998864",
      "confirmations": "50846",
      "textSignature": "updateEmissionRate(uint256)"
    },
    {
      "blockNumber": "17630663",
      "timeStamp": "1652029883",
      "hash": "0x3e39fe6a913e163febf036b1a8d9d7dcba546b0ab6900d63ac4883ac6c802317",
      "nonce": "6945",
      "blockHash": "0x427efa7112c8374f5b0c865b36a1d22fb309c754898d56dff796688c8597366b",
      "transactionIndex": "214",
      "from": "0xa3772e9b69b5877dde7580d17ae9716d228aafde",
      "to": "0xa334b8fb7f033b9698895a7c8220d48ac3dc6968",
      "value": "0",
      "gas": "48399",
      "gasPrice": "5000000000",
      "isError": "0",
      "txreceipt_status": "1",
      "input": "0xb3461559000000000000000000000000000000000000000000000000000000000000000a",
      "contractAddress": "",
      "cumulativeGasUsed": "24905474",
      "gasUsed": "32175",
      "confirmations": "50920",
      "textSignature": "updateMaxFindingWordsIndex(uint128)"
    }
  ]
}
```
