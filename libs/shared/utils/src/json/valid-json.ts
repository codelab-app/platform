import validator from 'validator'

export const isValidJson = (value: string | null): boolean => {
  return value === null || validator.isJSON(value)
}
