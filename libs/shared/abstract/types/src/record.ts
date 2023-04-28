/**
 * Filters the keys of a given `Record` type based on a specified string prefix.
 *
 * @template T The `Record` type to be filtered.
 * @template K The string prefix to filter the keys by.
 * @returns A new `Record` type containing only keys that start with the specified prefix.
 *
 * @example
 * type MyRecord = Record<string, number>;
 * type MyFilteredRecord = FilterKeys<MyRecord, 'prefix_'>;
 * // MyFilteredRecord will only include keys starting with 'prefix_'
 */
export type FilterRecordKeys<T, K extends string> = {
  [P in keyof T as P extends `${K}${infer Rest}` ? P : never]: T[P]
}
