import { db } from '@/firebase'

const fetchDailyDeliveries = async ({ date }) => {
  try {
    const response = await db.collection('delivery')
      .where('timestamp', '>=', new Date(date))
      .where('timestamp', '<=', new Date(date.endOf('day')))
      .get()
    const data = []
    response.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
    return { success: true, data }
  } catch (error) {
    return { success: false, error }
  }
}

const fetchDeliveryItem = async ({ id }) => {
  try {
    const doc = await db.collection('delivery').doc(id).get()
    return {
      success: true,
      data: {
        id: doc.id,
        ...doc.data()
      }
    }
  } catch (error) {
    return { success: false, error }
  }
}

const deleteDeliveryItem = async ({ id }) => {
  try {
    const result = db.collection('delivery').doc(id).delete()
    return {
      success: true,
      data: result
    }
  } catch (error) {
    return {
      success: false,
      error
    }
  }
}

const saveDeliveryItem = async ({ form }) => {
  if (form.id) {
    try {
      const result = await db.collection('delivery')
                             .doc(form.id)
                             .set({ ...form })
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error }
    }
  } else {
    try {
      const result = db.collection('delivery').add(form)
      return { success: true, data: result }
    } catch (error) {
      return { success: false, error }
    }
  }
}

export default {
  fetchDailyDeliveries,
  fetchDeliveryItem,
  deleteDeliveryItem,
  saveDeliveryItem
}
