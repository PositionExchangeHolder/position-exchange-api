export const endpoint = {
  v1: {
    prices: '/api/v1/prices',
    address: '/api/v1/address/{{address}}',
    deployer: {
      transactions: '/api/v1/deployer/transactions'
    },
    account: {
      verify: 'POST /api/v1/account/verify',
      getInfo: 'GET /api/v1/account/info/:address',
      updateInfo: 'POST /api/v1/account/info'
    }
  }
}
