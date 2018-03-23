import { db } from '@/firebase'
import { arrayToObjectById } from '@/utils'

const fetchDailyList = async ({ date }) => {
  try {
    const response = await db.collection('delivery')
      .where('timestamp', '>=', new Date(date))
      .where('timestamp', '<=', new Date(date.endOf('day')))
      .get()
    const data = []
    response.forEach(doc => data.push({ id: doc.id, ...doc.data() }))
    return { success: true, data: arrayToObjectById(data) }
  } catch (error) {
    return { success: false, error }
  }
}

const fetchItem = async ({ id }) => {
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

const deleteItem = async ({ id }) => {
  try {
    const result = await db.collection('delivery').doc(id).delete()
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

const createItem = async ({ form }) => {
  try {
    const result = await db.collection('delivery').add(form)
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error }
  }
}

const updateItem = async ({ form }) => {
  try {
    const result = await db.collection('delivery')
                           .doc(form.id)
                           .set({ ...form })
    return { success: true, data: result }
  } catch (error) {
    return { success: false, error }
  }
}

export default {
  fetchDailyList,
  fetchItem,
  deleteItem,
  createItem,
  updateItem
}
