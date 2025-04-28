export const compareArray = <T>(arr1: Array<T>, arr2: Array<T>): boolean =>
  arr1.length === arr2.length &&
  arr1.every((value, index) => value === arr2[index])
