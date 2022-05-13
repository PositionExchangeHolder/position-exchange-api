import { DB_FIREBASE } from '../../utils/constant'
import firestore from '../../utils/firebase'
import { now } from '../../utils/time'
import { isAccountActive } from './getAccountInfo'

const updateAccountInfo = async (
  address: string,
  data: object
): Promise<boolean> => {
  const active = await isAccountActive(address)
  
  if (!active) {
    return false
  }

  await firestore
    .collection(DB_FIREBASE.COLLECTIONS.ACCOUNT_INFO)
    .doc(address)
    .update({ ...data, updated_at: now() })
  
  return true
}

export default updateAccountInfo
