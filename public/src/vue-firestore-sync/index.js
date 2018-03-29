import Vue from 'vue'
import { db } from '@/firebase'

Vue.prototype.$db = db

export default new Vue({
  data: {
    store: {}
  },
  methods: {
    sync (refs) {
      Object.keys(refs).forEach(key => {
        // Check if collection or document
        const isCollection = !refs[key].parent
        // First unsubscribe if the key already exists
        if (this.store[key]) this.store[key].unsubscribe()

        // Get collection name
        const collection = isCollection ? refs[key].id : refs[key].parent.id

        // Set/reset store for this key
        this.store[key] = {
          name: key,
          ref: refs[key],
          pending: true,
          data: isCollection ? [] : null,
          collection,
          add (data) {
            db.collection(collection).add(data)
          },
          remove (id) {
            db.collection(collection).doc(id).delete()
          },
          update (data) {
            db.collection(collection).doc(data.id).set({ ...data })
          },
          save (data) {
            if (data.id) {
              db.collection(collection).doc(data.id).set({ ...data })
            } else {
              db.collection(collection).add(data)
            }
          }
        }

        Vue.set(this.store, 'key', this.store[key])

        if (isCollection) {
          this.store[key].unsubscribe = refs[key].onSnapshot(snapshot => {
            this.store[key].data = []
            snapshot.forEach(doc => {
              this.store[key].data.push({ id: doc.id, ...doc.data() })
            })
            this.store[key].pending = false
          })
        } else {
          this.store[key].unsubscribe = refs[key].onSnapshot(doc => {
            this.store[key].data = { id: doc.id, ...doc.data() }
            this.store[key].pending = false
          })
        }
      })
    }
  }
})
