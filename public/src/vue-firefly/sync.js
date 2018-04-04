import Vue from 'Vue'

export default (firefly) => (refs) => {
  Object.keys(refs).forEach(key => {
    // Check if collection or document
    const isQuery = !refs[key].path
    const isCollection = !isQuery && !refs[key].parent

    // First unsubscribe if the key already exists
    if (firefly.store[key]) firefly.store[key].unsubscribe()

    // Get collection name
    const colId = (isQuery && refs[key]._query.path.segments[0]) ||
                  (isCollection && refs[key].id) ||
                  refs[key].parent.id
    const colRef = firefly.db.collection(colId)

    // Set/reset store for firefly key
    firefly.store[key] = {
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
          const cached = firefly.store[key].data.find(x => x.id === id)
          if (cached) return cached

          const doc = firefly.store[key].collection.ref.doc(id).get()
          return { id: doc.id, ...doc.data() }
        }
      }
    }

    Vue.set(firefly.store, 'key', firefly.store[key])

    if (isCollection || isQuery) {
      firefly.store[key].unsubscribe = refs[key].onSnapshot(snapshot => {
        firefly.store[key].data = []
        snapshot.forEach(doc => {
          firefly.store[key].data.push({ id: doc.id, ...doc.data() })
        })
        firefly.store[key].pending = false
      })
    } else {
      firefly.store[key].unsubscribe = refs[key].onSnapshot(doc => {
        firefly.store[key].data = { id: doc.id, ...doc.data() }
        firefly.store[key].pending = false
      })
    }
  })
}
