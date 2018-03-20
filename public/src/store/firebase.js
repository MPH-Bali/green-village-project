import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  projectId: 'mph-bali',
  databaseURL: 'https://mph-bali.firebaseio.com'
})

export const db = firebase.firestore()
