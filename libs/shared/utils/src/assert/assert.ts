// export const assert = (
//   condition: boolean,
//   errorMessage = 'An assert error was thrown',
// ) => {
//   if (!condition) {
//     throw new Error(errorMessage)
//   }
// }

interface AssertIsDefined {
  <T>(val: T): asserts val is NonNullable<T>
}

export const assertIsDefined: AssertIsDefined = <T>(
  val: T,
): asserts val is NonNullable<T> => {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`)
  }
}
