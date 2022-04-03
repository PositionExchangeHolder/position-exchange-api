# Position Token Prices API

Serverless API implementation for Position Token Prices and Account Balances

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

**Parameters**
| Name | Type | Mandatory | Description
|---|---|---|---|
| pid | STRING | NO | Pool's pid. ``Eg: 1,2,3`` |
| nftPool | BOOLEAN | NO | Default ``true``|

**Response**
```json
{
  "data": {
    "balance": "3.856102266623459808087e+21",
    "totalPosiBalance": "3.856102266623459808087e+21"
  }
}
```

OR

```json
{
  "data": {
    "balance": "3.856102266623459808087e+21",
    "stakingPoolBalances": [
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
    "nftPoolBalances": {
      "pool": "v2",
      "stakingBalance": "200000000000000000000",
      "pendingReward": "15239747273991635813"
    },
    "totalPosiBalance": "4.0713420138974514439e+21"
  }
}
```
