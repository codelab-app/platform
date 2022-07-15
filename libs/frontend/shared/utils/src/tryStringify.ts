export const tryStringify = (object: unknown) => {
  try {
    return JSON.stringify(object || {})
  } catch (error) {
    console.log(error)

    return object
  }
}
