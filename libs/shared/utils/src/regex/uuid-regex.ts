export const uuidRegex =
  /[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}/g

export const removeUuidAndDashPrefix = (input: string): string => {
  const reg = new RegExp(`${uuidRegex.source}-`, 'gi')

  return input.replace(reg, '')
}
