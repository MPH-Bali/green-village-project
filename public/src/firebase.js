import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  apiKey: 'AIzaSyCovoGLda2oPHbjr8AkzIdIAXQgb7sUKfE',
  authDomain: 'mph-bali.firebaseapp.com',
  databaseURL: 'https://mph-bali.firebaseio.com',
  projectId: 'mph-bali',
  storageBucket: 'mph-bali.appspot.com',
  messagingSenderId: '879320565178'
})

firebase.auth().useDeviceLanguage()

const settings = {timestampsInSnapshots: true}
const firestore = firebase.firestore()
firestore.settings(settings)
export default firebase
export const db = firestore
