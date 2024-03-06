export const prettifyForConsole = (object: object) => {
  return JSON.stringify(object, null, 2)
}
