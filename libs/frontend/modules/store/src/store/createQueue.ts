export const createQueue = (code: string) => {
  try {
    // eslint-disable-next-line no-new-func
    return [new Function(code)]
  } catch (error) {
    console.log(error)

    return []
  }
}
