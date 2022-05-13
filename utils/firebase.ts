import 'dotenv/config'
import admin from 'firebase-admin'

const config = {
  projectId: process.env.FIREBASE_PROJECT_ID,
  privateKey: process.env.FIREBASE_PRIVATE_KEY,
  clientEmail: process.env.FIREBASE_CLIENT_EMAIL
}

admin.initializeApp({
  credential: admin.credential.cert(config)
})

const firestore = admin.firestore()

export default firestore
