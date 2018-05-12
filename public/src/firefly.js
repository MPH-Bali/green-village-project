export default {
  install (Vue, store, db) {
    let sync = function (refs) {
      Object.keys(refs).forEach(key => {
        // Check if collection or document
        const isQuery = !refs[key].path
        const isCollection = !isQuery && !refs[key].parent

        // First unsubscribe if the key already exists
        if (store.store[key]) store.store[key].unsubscribe()

        // Get collection name
        const colId = (isQuery && refs[key]._query.path.segments[0]) ||
                      (isCollection && refs[key].id) ||
                      refs[key].parent.id
        const colRef = db.collection(colId)

        // Set/reset store for this key
        store.store[key] = {
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
              const cached = store.store[key].data.find(x => x.id === id)
              if (cached) return cached

              const doc = store.store[key].collection.ref.doc(id).get()
              return { id: doc.id, ...doc.data() }
            }
          }
        }

        Vue.set(store.store, 'key', store.store[key])

        if (isCollection || isQuery) {
          store.store[key].unsubscribe = refs[key].onSnapshot(snapshot => {
            store.store[key].data = []
            snapshot.forEach(doc => {
              store.store[key].data.push({ id: doc.id, ...doc.data() })
            })
            store.store[key].pending = false
          })
        } else {
          store.store[key].unsubscribe = refs[key].onSnapshot(doc => {
            store.store[key].data = { id: doc.id, ...doc.data() }
            store.store[key].pending = false
          })
        }
      })
    }

    Vue.prototype.$db = db
    Vue.prototype.$sync = sync
    Vue.prototype.$store = store.store
  }
}
