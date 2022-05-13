export const removeUndefinedFromObject = (obj: object): object => {
  return Object.fromEntries(
    Object.entries(obj).filter(([_, v]) => v !== undefined)
  )
}

export const isEmptyObject = (obj: object): boolean => {
  return Object.keys(obj).length === 0
}
