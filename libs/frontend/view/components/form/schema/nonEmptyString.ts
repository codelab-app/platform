export const nonEmptyString = {
  type: 'string' as const,
  transform: ['trim'],
  minLength: 1,
}
