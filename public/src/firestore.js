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
  computed: {
    list () {
      return {
        ...this.dailyCollections,
        ...this.collections
      }
    }
  },
  data () {
    return {
      dailySubscriptions: [],
      start: null,
      end: null,
      fees: [],
      charts: null,
      // ToDo: Add all collections
      dailyCollections: {
        delivery: [],
        material: [],
        workerhours: [],
        expense: []
      },
      collections: {
        banjar: [],
        person: [],
        sales: [],
        settings: []
      },
      collectionsPending: {
        delivery: false,
        banjar: false,
        person: false,
        workerhours: false,
        sales: false,
        settings: false,
        expense: false
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
    syncCharts () {
      db.collection('charts').doc(this.$moment().format('YYYY-ww')).onSnapshot(
        snapshot => {
          Vue.set(this, 'charts', snapshot.data())
        })
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
          this.collectionsPending[collection] = false
        })
      })
    },
    syncFees (personId) {
      db.collection('fee')
        .where('personId', '==', personId)
        .onSnapshot(snapshot => {
          this.fees = []
          snapshot.forEach(doc => {
            this.fees.push({ id: doc.id, ...doc.data() })
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
      return data.id ? this.update(collection, data) : this.add(collection, data)
    },
    find (collection, condition) {
      return this.list[collection].find(x => condition(x))
    },
    async get (collection, id) {
      const cached = this.list[collection].find(x => x.id === id)
      if (cached) return cached

      const result = await db.collection(collection).doc(id).get()
      return {
        id: result.id,
        ...result.data()
      }
    }
  }
})
