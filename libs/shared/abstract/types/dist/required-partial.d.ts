/**
 * Constructs a new type that is a partial version of the given type `T`, where all properties are optional.
 *
 * This is useful when you want to create a new type that is similar to an existing type `T`, but with some or all of the properties as optional.
 *
 * @template T - The type to make partially optional.
 * @returns A new type that is a partial version of `T`.
 *
 * @example
 * interface User {
 *   id: number
 *   name: string
 *   email: string
 * }
 *
 * type PartialUser = RequiredPartial<User>
 *
 * // PartialUser is equivalent to:
 * // {
 * //   id: number | undefined
 * //   name: string | undefined
 * //   email: string | undefined
 * // }
 *
 * const user: PartialUser = {
 *   id: 1,
 *   name: 'John Doe'
 *   // email can be omitted
 * }
 */
export type RequiredPartial<T> = {
    [K in keyof T]: T[K] | undefined;
};
