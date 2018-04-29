export default {
  install (Vue, { db, keys = {} }) {
    let { sync, store } = initInstance(Vue, db)

    Vue.prototype[keys.$db || '$db'] = db
    Vue.prototype[keys.$sync || '$sync'] = sync
    Vue.prototype[keys.$store || '$store'] = store
  }
}

const initInstance = (Vue, db) => {
  return new Vue({
    data: {
      store: {}
    },
    methods: {
      sync (refs) {
        Object.keys(refs).forEach(key => {
          // Check if collection or document
          const isQuery = !refs[key].path
          const isCollection = !isQuery && !refs[key].parent

          // First unsubscribe if the key already exists
          if (this.store[key]) this.store[key].unsubscribe()

          // Get collection name
          const colId = (isQuery && refs[key]._query.path.segments[0]) ||
                        (isCollection && refs[key].id) ||
                        refs[key].parent.id
          const colRef = db.collection(colId)

          // Set/reset store for this key
          this.store[key] = {
            name: key,
            ref: refs[key],
            pending: true,
            data: isCollection ? [] : null,
            collection: {
              id: colId,
              ref: colRef,
              add: (data) => colRef.add(data),
              remove: (id) => colRef.doc(id).delete(),
              update: (data) => colRef.doc(data.id).set({ ...data }),
              save: (data) => data.id ? colRef.doc(data.id).set({ ...data }) : colRef.add(data),
              get: async (id) => {
                const cached = this.store[key].data.find(x => x.id === id)
                if (cached) return cached

                const doc = this.store[key].collection.ref.doc(id).get()
                return { id: doc.id, ...doc.data() }
              }
            }
          }

          Vue.set(this.store, 'key', this.store[key])

          if (isCollection || isQuery) {
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
}
