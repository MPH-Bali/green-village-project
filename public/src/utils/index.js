export const arrayToObjectById = (array) => {
  const obj = {}
  array.forEach(item => {
    obj[item.id] = item
  })
  return obj
}
