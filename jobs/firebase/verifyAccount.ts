import { DB_FIREBASE } from '../../utils/constant'
import firestore from '../../utils/firebase'
import { generateNonce } from '../../utils/nonce'
import { now } from '../../utils/time'
import { AccountSchema, Signature } from '../../utils/types'

const createNewAccount = (
  address: string,
  signature: Signature
): AccountSchema => {
  const obj = {
    address,
    signature: signature.signature,
    nonce: generateNonce(),
    active: true,
    created_at: now(),
    updated_at: now()
  }

  return obj
}

const verifyAccount = async (
  address: string,
  signature: Signature
): Promise<string> => {
  const accountRef = await firestore
    .collection(DB_FIREBASE.COLLECTIONS.ACCOUNT_INFO)
    .doc(address)
    .get()
    .then(ref => ref.data())

  if (accountRef) {
    return accountRef.nonce
  }

  const newAccount = createNewAccount(address, signature)

  await firestore
    .collection(DB_FIREBASE.COLLECTIONS.ACCOUNT_INFO)
    .doc(address)
    .set(newAccount)
  
  return newAccount.nonce
}

export default verifyAccount
