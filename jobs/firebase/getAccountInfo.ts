import { DB_FIREBASE } from '../../utils/constant'
import firestore from '../../utils/firebase'
import { AccountSchema } from '../../utils/types'

export const getAccountInfo = async (address: string): Promise<AccountSchema | null> => {
  const account = await firestore
    .collection(DB_FIREBASE.COLLECTIONS.ACCOUNT_INFO)
    .doc(address)
    .get()
    .then(docRef => docRef.data())

  if (!account) {
    return null
  }

  delete account.signature
  delete account.nonce

  return account as AccountSchema
}

export const isAccountActive = async (address: string): Promise<boolean> => {
  const account = await getAccountInfo(address)
  if (account && account.active) {
    return true
  }

  return false
}
