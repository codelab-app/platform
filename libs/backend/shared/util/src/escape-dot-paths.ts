/**
 * `.` -> `\\.`
 */
export const escapeDotPathKeys = (key: string) => {
  return key.replace(/\./g, '\\\\.')
}
