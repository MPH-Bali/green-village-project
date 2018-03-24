import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

firebase.initializeApp({
  // projectId: 'mph-bali',
  // databaseURL: 'https://mph-bali.firebaseio.com'
  apiKey: 'AIzaSyCzAG550SAeOTbwjs6TpVm7VtrET6lIKrY',
  authDomain: 'green-village-project-danes.firebaseapp.com',
  databaseURL: 'https://green-village-project-danes.firebaseio.com',
  projectId: 'green-village-project-danes'
})

firebase.auth().useDeviceLanguage()

export default firebase
export const db = firebase.firestore()
export const auth = firebase.auth()
