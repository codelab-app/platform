/**
 * Parses an object string into fields
 */
export const interfaceTypeParser = (type: string) => {
  console.log('InterfaceType parser', type)

  const pairs: Array<[fieldKey: string, fieldType: string]> = type
    // Replace brackets, optional, and space
    .replace(/[{}? ]/g, '')
    .split(',')
    .map((x) => {
      // Add quotes around each value so we can json parse
      const objectString = `{ "${x.trim().replace(':', '":"')}" }`
      const object = JSON.parse(objectString)
      const fieldKey = Object.keys(object)[0]
      const fieldType = Object.values(object)[0] as string

      if (!fieldKey || !fieldType) {
        throw new Error('Invalid interface key or value')
      }

      return [fieldKey, fieldType]
    })

  return pairs
}
