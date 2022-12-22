export function splitArray(array: { name: string }[]) {
  const markUp = []
  let i = 0,
    j = array.length - 1
  while (i <= j) {
    if (i === j) {
      const middle = Math.ceil(array.length / 2) - 1
      markUp.push([array[middle].name])
    } else {
      markUp.push([array[i].name, array[j].name])
    }
    i++
    j--
  }
  return markUp
}
