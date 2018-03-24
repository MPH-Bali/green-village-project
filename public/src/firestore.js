import Vue from 'vue'
import moment from 'vue-moment'
import firebase from 'firebase/app'
import 'firebase/firestore'

firebase.initializeApp({
  projectId: 'mph-bali',
  databaseURL: 'https://mph-bali.firebaseio.com'
})

Vue.use(moment)
const db = firebase.firestore()

export default new Vue({
  data () {
    return {
      persons: [],
      dailySubscriptions: [],
      delivery: [],
      start: null,
      end: null,
      // ToDo: Add all collections
      collections: ['delivery'],
      collectionsPending: {
        delivery: false
      }
    }
  },
  methods: {
    changeDate (date) {
      const newDate = this.$moment(date)
      const today = this.$moment().startOf('day')
      this.start = today > newDate ? newDate : today
      this.end = this.$moment(this.start).endOf('day')
      this.syncDailyData()
    },
    syncPersons () {
      db.collection('person').onSnapshot(snapshot => {
        this.persons = []
        snapshot.forEach(doc => {
          this.persons.push({ id: doc.id, ...doc.data() })
        })
      })
    },
    syncDailyData () {
      this.dailySubscriptions.forEach(unsubscribe => unsubscribe())
      this.dailySubscriptions = []

      this.collections.forEach(collection => {
        this.collectionsPending[collection] = true
        const unsubscribe = db.collection(collection)
          .where('timestamp', '>=', new Date(this.start))
          .where('timestamp', '<=', new Date(this.end))
          .onSnapshot(snapshot => {
            this[collection] = []
            snapshot.forEach(doc => {
              this[collection].push({ id: doc.id, ...doc.data() })
            })
            this.collectionsPending[collection] = false
          })

        this.dailySubscriptions.push(unsubscribe)
      })
    },
    add (collection, data) {
      return db.collection(collection).add(data)
    },
    remove (collection, id) {
      return db.collection(collection).doc(id).delete()
    },
    update (collection, data) {
      return db.collection(collection).doc(data.id).set({ ...data })
    },
    async get (collection, id) {
      const result = await db.collection(collection).doc(id).get()
      return {
        id: result.id,
        ...result.data()
      }
    }
  }
})
