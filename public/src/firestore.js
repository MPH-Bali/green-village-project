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
      dailySubscriptions: [],
      start: null,
      end: null,
      // ToDo: Add all collections
      dailyCollections: {
        delivery: []
      },
      collections: {
        banjar: [],
        person: []
      },
      collectionsPending: {
        delivery: false,
        banjar: false,
        person: false
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
    syncData () {
      Object.keys(this.collections).forEach((collection) => {
        this.collectionsPending[collection] = true
        this.collections[collection] = []

        db.collection(collection).onSnapshot(snapshot => {
          this.collections[collection] = []
          snapshot.forEach(doc => {
            this.collections[collection].push({ id: doc.id, ...doc.data() })
          })
        })
      })
    },
    syncDailyData () {
      this.dailySubscriptions.forEach(unsubscribe => unsubscribe())
      this.dailySubscriptions = []

      Object.keys(this.dailyCollections).forEach((collection) => {
        this.collectionsPending[collection] = true
        const unsubscribe = db.collection(collection)
          .where('timestamp', '>=', new Date(this.start))
          .where('timestamp', '<=', new Date(this.end))
          .onSnapshot(snapshot => {
            this.dailyCollections[collection] = []
            snapshot.forEach(doc => {
              this.dailyCollections[collection].push({ id: doc.id, ...doc.data() })
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
    save (collection, data) {
      const action = data.id ? this.update : this.add
      return action(collection, data)
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
