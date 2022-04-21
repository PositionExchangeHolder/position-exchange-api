# Position Token Prices API

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
