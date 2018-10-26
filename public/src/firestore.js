import Vue from 'vue'
import moment from 'vue-moment'
import firebase, { db } from '@/firebase'

Vue.use(moment)

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
      loading: false,
      user: null,
      person: null,
      fees: [],
      charts: {},
      // ToDo: Add all collections
      dailyCollections: {
        delivery: [],
        material: [],
        workerhours: [],
        expense: [],
        stock: []
      },
      collections: {
        banjar: [],
        person: [],
        sales: [],
        settings: [],
        stock: []
      },
      collectionsPending: {
        delivery: false,
        banjar: false,
        person: false,
        workerhours: false,
        sales: false,
        settings: false,
        expense: false,
        stock: false
      }
    }
  },
  methods: {
    initStore () {
      // Show loading mask initially while we wait for firebase auth to init.
      this.loading = true
      firebase.auth().onAuthStateChanged(async user => {
        if (user) {
          this.user = user

          // Attempt to get the person linked to this user, if it is the
          // first time signing on we create a person instead.
          this.person = await this.getUserByUid(user.uid)
          if (!this.person) {
            await this.$firestore.save('person', {
              login: user.uid,
              phone: user.phoneNumber,
              type: {
                employee: true
              },
              role: {
                communityManager: true
              },
              approved: false
            })
            this.person = await this.getUserByUid(user.uid)
          }

          // If the user is attached to an approved person in the system, load app data.
          if (this.person && this.person.approved) {
            this.$firestore.changeDate()
            this.$firestore.syncData()
          }
        }
        this.loading = false
      })
    },
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
    async getUserByUid (uid) {
      let querySnapshot = await db.collection('person')
                          .where('login', '==', uid)
                          .get()

      let user = querySnapshot &&
                  querySnapshot.docs[0] &&
                  querySnapshot.docs[0].data()

      return user || null
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
