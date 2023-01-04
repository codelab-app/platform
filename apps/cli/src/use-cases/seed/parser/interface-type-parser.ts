export const interfaceTypeParser = (type: string) => {
  console.log('InterfaceType parser', type)

  const pairs: Array<[string, string]> = type
    // Replace brackets, optional, and space
    .replace(/[{}? ]/g, '')
    .split(',')
    .map((x) => {
      // Add quotes around each value so we can json parse
      const objectString = `{ "${x.trim().replace(':', '":"')}" }`
      const object = JSON.parse(objectString)
      const key = Object.keys(object)[0]
      const value = Object.values(object)[0] as string

      if (!key || !value) {
        throw new Error('Invalid interface key or value')
      }

      return [key, value]
    })

  return pairs
}
