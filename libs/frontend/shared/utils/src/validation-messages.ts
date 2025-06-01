export const requiredMsg = (name: string) => `${name} is required`
export const minLengthMsg = (name: string, minLength: number) =>
  `${name} must have at least ${minLength} character`

export const titleCasePatternMsg = (name: string) =>
  `${name} must be in title case with no extra spaces`
