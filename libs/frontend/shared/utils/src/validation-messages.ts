export const requiredMsg = (name: string) => `${name} is required`
export const minLengthMsg = (name: string, minLength: number) =>
  `${name} must have at least ${minLength} character`

export const maxLengthMsg = (name: string, maxLength: number) =>
  `${name} must have less than ${maxLength} character`

export const pattrenMsg = (name: string, pattern: string) =>
  `${name} must match this pattren: ${pattern}`

export const titleCasePatternMsg = (name: string) =>
  `${name} must be in title case with no extra spaces`
