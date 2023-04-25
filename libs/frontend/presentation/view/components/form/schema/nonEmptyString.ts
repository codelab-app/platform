export const nonEmptyString = {
  minLength: 1,
  transform: ['trim'],
  type: 'string' as const,
}
